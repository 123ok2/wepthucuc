import React, { useState, useEffect } from 'react';
import { Article, NavTab } from './types';
import { INITIAL_ARTICLES } from './data/initialData';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { NewsEventsView } from './components/NewsEventsView';
import { BoardingView } from './components/BoardingView';
import { DocumentsView } from './components/DocumentsView';
import { AcademicView } from './components/AcademicView';
import { DigitalView } from './components/DigitalView';
import { GalleryView } from './components/GalleryView';
import { ContactView } from './components/ContactView';
import { ArticleModal } from './components/ArticleModal';
import { CreatePostModal } from './components/CreatePostModal';
import { ManagePostsModal } from './components/ManagePostsModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { auth, db, logOutAdmin } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, doc, setDoc, deleteDoc, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';

const STORAGE_KEY = 'thucuc_articles_v1';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading articles from localStorage', e);
    }
    return INITIAL_ARTICLES;
  });

  const [currentTab, setCurrentTab] = useState<NavTab>('trang-chu');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [manageModalOpen, setManageModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Real-time sync with Firebase Cloud Firestore
  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;
    try {
      const q = collection(db, 'articles');
      unsubscribeSnapshot = onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            const remoteArticles: Article[] = [];
            snap.forEach((docItem) => {
              remoteArticles.push(docItem.data() as Article);
            });
            if (remoteArticles.length > 0) {
              // Sort by publishDate descending
              remoteArticles.sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;
                return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
              });
              setArticles(remoteArticles);
            }
          }
        },
        (error) => {
          console.info('Firestore onSnapshot notice:', error.message);
        }
      );
    } catch (err) {
      console.info('Firestore real-time subscription error:', err);
    }

    return () => {
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  // Sync articles to localStorage as persistent local cache
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Error saving articles to localStorage', e);
    }
  }, [articles]);

  const handleTabChange = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAttemptCreatePost = () => {
    if (!currentUser) {
      setAuthModalOpen(true);
    } else {
      setEditingArticle(null);
      setCreateModalOpen(true);
    }
  };

  const handleAttemptManagePosts = () => {
    if (!currentUser) {
      setAuthModalOpen(true);
    } else {
      setManageModalOpen(true);
    }
  };

  const handleLogout = async () => {
    try {
      await logOutAdmin();
      setManageModalOpen(false);
      setCreateModalOpen(false);
    } catch (e) {
      console.error('Error logging out', e);
    }
  };

  const handleSaveArticle = async (articleData: Omit<Article, 'id' | 'views'>) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }

    if (editingArticle) {
      const updated: Article = {
        ...editingArticle,
        ...articleData,
      };
      setArticles((prev) =>
        prev.map((art) => (art.id === editingArticle.id ? updated : art))
      );
      setEditingArticle(null);

      // Persist to Firestore if available
      try {
        await setDoc(doc(db, 'articles', updated.id), updated);
      } catch (e) {
        console.warn('Firestore write warning:', e);
      }
    } else {
      const newPost: Article = {
        ...articleData,
        id: `post-${Date.now()}`,
        views: 1,
      };
      setArticles((prev) => [newPost, ...prev]);

      // Persist to Firestore if available
      try {
        await setDoc(doc(db, 'articles', newPost.id), newPost);
      } catch (e) {
        console.warn('Firestore write warning:', e);
      }
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }

    setArticles((prev) => prev.filter((a) => a.id !== id));
    if (activeArticle?.id === id) {
      setActiveArticle(null);
    }

    try {
      await deleteDoc(doc(db, 'articles', id));
    } catch (e) {
      console.warn('Firestore delete warning:', e);
    }
  };

  const handleTogglePin = (id: string) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }

    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isPinned: !a.isPinned } : a))
    );
  };

  const handleEditArticle = (article: Article) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    setEditingArticle(article);
    setCreateModalOpen(true);
  };

  const handleResetDefaults = () => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    setArticles(INITIAL_ARTICLES);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ARTICLES));
    } catch (e) {
      console.error(e);
    }
  };

  // Find related articles for reader modal
  const relatedArticles = activeArticle
    ? articles
        .filter(
          (a) => a.category === activeArticle.category && a.id !== activeArticle.id
        )
        .slice(0, 4)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onOpenCreatePost={handleAttemptCreatePost}
        onOpenManagePosts={handleAttemptManagePosts}
        articleCount={articles.length}
        currentUser={currentUser}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {currentTab === 'trang-chu' && (
          <HomeView
            articles={articles}
            onSelectArticle={setActiveArticle}
            onNavigateTab={handleTabChange}
            onOpenCreatePost={handleAttemptCreatePost}
          />
        )}

        {currentTab === 'gioi-thieu' && <AboutView />}

        {currentTab === 'tin-tuc' && (
          <NewsEventsView
            articles={articles}
            onSelectArticle={setActiveArticle}
            onOpenCreatePost={handleAttemptCreatePost}
          />
        )}

        {currentTab === 'ban-tru' && (
          <BoardingView
            articles={articles}
            onSelectArticle={setActiveArticle}
            onOpenCreatePost={handleAttemptCreatePost}
          />
        )}

        {currentTab === 'van-ban' && (
          <DocumentsView
            articles={articles}
            onSelectArticle={setActiveArticle}
            onOpenCreatePost={handleAttemptCreatePost}
          />
        )}

        {currentTab === 'chuyen-mon' && (
          <AcademicView
            articles={articles}
            onSelectArticle={setActiveArticle}
            onOpenCreatePost={handleAttemptCreatePost}
          />
        )}

        {currentTab === 'chuyen-doi-so' && (
          <DigitalView
            articles={articles}
            onSelectArticle={setActiveArticle}
            onOpenCreatePost={handleAttemptCreatePost}
          />
        )}

        {currentTab === 'thu-vien-anh' && <GalleryView />}

        {currentTab === 'lien-he' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer
        onNavigateTab={handleTabChange}
        onOpenManagePosts={handleAttemptManagePosts}
      />

      {/* Article Reader Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onSelectArticle={setActiveArticle}
        relatedArticles={relatedArticles}
      />

      {/* Create / Edit Article Modal (Requires Login) */}
      <CreatePostModal
        isOpen={createModalOpen && !!currentUser}
        onClose={() => {
          setCreateModalOpen(false);
          setEditingArticle(null);
        }}
        onSave={handleSaveArticle}
        initialPost={editingArticle}
      />

      {/* Manage Posts Modal (Requires Login) */}
      <ManagePostsModal
        isOpen={manageModalOpen && !!currentUser}
        onClose={() => setManageModalOpen(false)}
        articles={articles}
        onDeleteArticle={handleDeleteArticle}
        onTogglePin={handleTogglePin}
        onEditArticle={handleEditArticle}
        onOpenCreateNew={() => {
          setEditingArticle(null);
          setCreateModalOpen(true);
        }}
        onResetDefaults={handleResetDefaults}
        onViewArticle={setActiveArticle}
      />

      {/* Auth Modal for Admin Login */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </div>
  );
}
