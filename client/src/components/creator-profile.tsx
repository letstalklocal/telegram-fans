import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { Creator } from "@db/schema";

interface CreatorProfileProps {
  creator: Creator;
}

export function CreatorProfile({ creator }: CreatorProfileProps) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          {creator.avatarUrl ? (
            <AvatarImage src={creator.avatarUrl} alt={creator.name} />
          ) : (
            <AvatarFallback>
              {creator.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        <div>
          <h2 className="text-xl font-bold">{creator.name}</h2>
          {creator.bio && (
            <p className="text-muted-foreground mt-1">{creator.bio}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}