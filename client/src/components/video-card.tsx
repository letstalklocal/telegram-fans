import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { showConfirm } from "@/lib/telegram";
import type { Video } from "@db/schema";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const confirmed = await showConfirm(`Purchase "${video.title}" for $${video.price}?`);
      if (!confirmed) return;
      
      const res = await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: video.id }),
      });
      
      if (!res.ok) throw new Error("Failed to purchase video");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Video purchased successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Purchase failed", 
        description: error.message,
        variant: "destructive"
      });
    },
  });

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        {video.thumbnailUrl ? (
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            No Preview
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold truncate">{video.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {video.description}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="font-bold">${video.price}</span>
        <Button onClick={() => mutate()}>
          Purchase
        </Button>
      </CardFooter>
    </Card>
  );
}
