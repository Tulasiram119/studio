import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PostList from '@/components/post-list';
import InstallPwa from '@/components/install-pwa';
import NetworkStatus from '@/components/network-status';
import BackgroundSync from '@/components/background-sync';
import { Button } from '@/components/ui/button';
import { Github, Zap, WifiOff, Download, Bell } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center">
            <Zap className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-xl font-bold font-headline">NextWeb PWA</h1>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <InstallPwa />
            <NetworkStatus />
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/firebase/firebase-studio" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl font-headline">
            Modern Web Experience
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Installable, offline-ready, and lightning fast. Welcome to the future of web applications.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="mr-2 text-accent" />
                Installable
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>
                Add this application to your home screen for a native-app like experience. Quick access, and seamless integration.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <WifiOff className="mr-2 text-accent" />
                Offline Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>
                Continue browsing even without an internet connection. Key content and data are cached for offline availability.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 text-accent" />
                Background Sync
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <CardDescription className="flex-grow">
                Get the latest content updates automatically in the background, even when the app is closed.
              </CardDescription>
              <div className="mt-4">
                <BackgroundSync />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Latest Posts</CardTitle>
              <CardDescription>Fetched using Tanstack Query with offline support via Service Worker caching.</CardDescription>
            </CardHeader>
            <CardContent>
              <PostList />
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 h-24">
            <p className="text-center text-sm leading-loose text-muted-foreground">
                Built with Next.js, ShadCN/UI, and PWA magic.
            </p>
        </div>
      </footer>
    </div>
  );
}
