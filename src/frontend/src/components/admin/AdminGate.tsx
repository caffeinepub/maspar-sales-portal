import { useState, useEffect } from 'react';
import { checkCredentials, isAdminUnlocked, setAdminUnlocked, clearAdminAuth } from '../../lib/adminAuth';
import { UI_TEXT } from '../../lib/uiText';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { LogOut } from 'lucide-react';

interface AdminGateProps {
  children: React.ReactNode;
}

export function AdminGate({ children }: AdminGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setIsUnlocked(isAdminUnlocked());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (checkCredentials(username, password)) {
      setAdminUnlocked(true);
      setIsUnlocked(true);
    } else {
      setError(UI_TEXT.admin.loginError);
    }
  };

  const handleLogout = () => {
    clearAdminAuth();
    setIsUnlocked(false);
    setUsername('');
    setPassword('');
    setError('');
  };

  if (!isUnlocked) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md glass-strong">
          <CardHeader>
            <CardTitle>{UI_TEXT.admin.loginTitle}</CardTitle>
            <CardDescription>{UI_TEXT.admin.loginSubtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{UI_TEXT.admin.username}</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{UI_TEXT.admin.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full">
                {UI_TEXT.admin.loginButton}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="w-4 h-4" />
          {UI_TEXT.admin.logoutButton}
        </Button>
      </div>
      {children}
    </div>
  );
}
