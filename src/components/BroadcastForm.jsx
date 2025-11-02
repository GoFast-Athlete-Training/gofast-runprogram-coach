import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Send } from 'lucide-react';

const BroadcastForm = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Demo: Store broadcast message
    const broadcast = {
      message,
      date: new Date().toISOString(),
      sender: 'Head Coach'
    };
    
    localStorage.setItem('bgr_broadcast', JSON.stringify(broadcast));
    
    setSent(true);
    
    if (onSend) {
      onSend(broadcast);
    }

    // Reset after 2 seconds
    setTimeout(() => {
      setSent(false);
      setMessage('');
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Send className="w-5 h-5" />
          <span>Broadcast to All Coaches</span>
        </CardTitle>
        <CardDescription>
          Send a message to all coaches across all sites
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sent ? (
          <div className="text-center py-4 text-green-600">
            <p className="font-semibold">Broadcast sent successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex min-h-[120px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
                placeholder="Enter your message for all coaches..."
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Send Broadcast
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default BroadcastForm;

