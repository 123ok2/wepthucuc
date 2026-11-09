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

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Helper to safely sort articles (pinned first, then newest publishDate/timestamp first)
  const sortArticlesList = (list: Article[]): Article[] => {
    return [...list].sort((a, b) => {
      const pinnedA = Boolean(a.isPinned);
      const pinnedB = Boolean(b.isPinned);
      if (pinnedA && !pinnedB) return -1;
      if (!pinnedA && pinnedB) return 1;
      const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
      const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
      const diff = (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
      if (diff !== 0) return diff;
      return b.id.localeCompare(a.id);
    });
  };

  // Direct active fetch from Firestore
  const syncFromFirestore = async (showToast = false) => {
    setIsSyncing(true);
    try {
      const q = collection(db, 'articles');
      const snap = await getDocs(q);
      if (!snap.empty) {
        const remoteArticles: Article[] = [];
        snap.forEach((docItem) => {
          const data = docItem.data() as Article;
          remoteArticles.push({ ...data, id: data.id || docItem.id });
        });
        if (remoteArticles.length > 0) {
          const sorted = sortArticlesList(remoteArticles);
          setArticles(sorted);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
          } catch (e) {}
          if (showToast) {
            setSyncToast(`Đã đồng bộ ${sorted.length} bài viết từ cơ sở dữ liệu Firebase!`);
            setTimeout(() => setSyncToast(null), 3000);
          }
        }
      }
    } catch (err: any) {
      console.warn('Firestore getDocs fetch:', err?.message || err);
      if (showToast) {
        setSyncToast('Lỗi khi tải từ Firebase: ' + (err.message || 'Thử lại sau'));
        setTimeout(() => setSyncToast(null), 3000);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Sync on mount and subscribe to Firestore real-time onSnapshot
  useEffect(() => {
    // 1. Immediately fetch fresh data from Firestore
    syncFromFirestore(false);

    // 2. Real-time live listener for background updates
    let unsubscribeSnapshot: (() => void) | null = null;
    try {
      const q = collection(db, 'articles');
      unsubscribeSnapshot = onSnapshot(
        q,
        (snap) => {
          if (!snap.empty) {
            const remoteArticles: Article[] = [];
            snap.forEach((docItem) => {
              const data = docItem.data() as Article;
              remoteArticles.push({ ...data, id: data.id || docItem.id });
            });
            if (remoteArticles.length > 0) {
              const sorted = sortArticlesList(remoteArticles);
              setArticles(sorted);
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
              } catch (e) {}
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

  // Check URL on mount and on popstate to open shared article link (?bai-viet=... or ?id=...)
  useEffect(() => {
    const handleUrlRoute = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const articleParam = params.get('bai-viet') || params.get('article') || params.get('id');
        if (articleParam) {
          const found = articles.find(
            (a) => a.slug === articleParam || a.id === articleParam
          );
          if (found) {
            setActiveArticle(found);
          }
        }
      } catch (err) {
        console.warn('URL route check error:', err);
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, [articles]);

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

  const handleSelectArticle = (article: Article) => {
    setActiveArticle(article);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('bai-viet', article.slug || article.id);
      window.history.pushState({}, '', url.toString());
    } catch (e) {
      console.warn('Failed to update URL search param', e);
    }
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('bai-viet');
      url.searchParams.delete('article');
      url.searchParams.delete('id');
      const cleanPath = url.pathname + (url.search ? url.search : '');
      window.history.pushState({}, '', cleanPath);
    } catch (e) {
      console.warn('Failed to clean URL search param', e);
    }
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
      handleSelectArticle(updated);

      // Persist to Firestore
      try {
        await setDoc(doc(db, 'articles', updated.id), updated);
        console.info('Đã cập nhật bài viết thành công trên Firestore:', updated.id);
      } catch (e: any) {
        console.error('Lỗi lưu Firestore:', e.message || e);
      }
    } else {
      const newPost: Article = {
        ...articleData,
        id: `post-${Date.now()}`,
        views: 1,
      };
      setArticles((prev) => [newPost, ...prev]);

      // Immediately display the newly published post with its shareable link
      handleSelectArticle(newPost);

      // Persist to Firestore
      try {
        await setDoc(doc(db, 'articles', newPost.id), newPost);
        console.info('Đã lưu bài viết mới thành công trên Firestore:', newPost.id);
      } catch (e: any) {
        console.error('Lỗi lưu Firestore:', e.message || e);
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
      handleCloseArticle();
    }

    try {
      await deleteDoc(doc(db, 'articles', id));
      console.info('Đã xóa bài viết trên Firestore:', id);
    } catch (e: any) {
      console.error('Lỗi xóa Firestore:', e.message || e);
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
      {/* Toast Notification */}
      {syncToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{syncToast}</span>
        </div>
      )}

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
        onSyncFirestore={() => syncFromFirestore(true)}
        isSyncing={isSyncing}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {currentTab === 'trang-chu' && (
          <HomeView
            articles={articles}
            onSelectArticle={handleSelectArticle}
            onNavigateTab={handleTabChange}
            onOpenCreatePost={handleAttemptCreatePost}
          />
        )}

        {currentTab === 'gioi-thieu' && <AboutView />}

        {currentTab === 'tin-tuc' && (
          <NewsEventsView
            articles={articles}
            onSelectArticle={handleSelectArticle}
            onOpenCreatePost={handleAttemptCreatePost}
          />
        )}

        {currentTab === 'ban-tru' && (
          <BoardingView
            articles={articles}
            onSelectArticle={handleSelectArticle}
            onOpenCreatePost={handleAttemptCreatePost}
          />
        )}

        {currentTab === 'van-ban' && (
          <DocumentsView
            articles={articles}
            onSelectArticle={handleSelectArticle}
            onOpenCreatePost={handleAttemptCreatePost}
          />
        )}

        {currentTab === 'chuyen-mon' && (
          <AcademicView
            articles={articles}
            onSelectArticle={handleSelectArticle}
            onOpenCreatePost={handleAttemptCreatePost}
          />
        )}

        {currentTab === 'chuyen-doi-so' && (
          <DigitalView
            articles={articles}
            onSelectArticle={handleSelectArticle}
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

      {/* Article Reader Modal with deep-linking & unique share link */}
      <ArticleModal
        article={activeArticle}
        onClose={handleCloseArticle}
        onSelectArticle={handleSelectArticle}
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
        onViewArticle={handleSelectArticle}
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
