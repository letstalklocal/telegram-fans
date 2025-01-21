import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Video, Purchase } from "@db/schema";
import { getCurrentUser } from "@/lib/telegram";

export default function CreatorDashboard() {
  const user = getCurrentUser();

  const { data: videos = [] } = useQuery<Video[]>({
    queryKey: ["/api/creator/videos"],
  });

  const { data: purchases = [] } = useQuery<Purchase[]>({
    queryKey: ["/api/creator/purchases"],
  });

  const totalEarnings = purchases
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Creator Dashboard</h1>
        <Link href="/upload">
          <Button>Upload New Video</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{videos.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{purchases.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalEarnings.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
      <div className="space-y-4">
        {purchases.slice(0, 5).map((purchase) => (
          <Card key={purchase.id}>
            <CardContent className="flex justify-between items-center py-4">
              <div>
                <p className="font-medium">Video #{purchase.videoId}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(purchase.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="font-medium">${purchase.amount}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
