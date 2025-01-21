import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { creators, videos, purchases } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Get all videos
  app.get("/api/videos", async (req, res) => {
    const allVideos = await db.query.videos.findMany({
      orderBy: (videos, { desc }) => [desc(videos.createdAt)],
    });
    res.json(allVideos);
  });

  // Get creator's videos
  app.get("/api/creator/videos", async (req, res) => {
    const creatorId = req.query.creatorId;
    if (!creatorId) return res.status(400).send("Creator ID required");

    const creatorVideos = await db.query.videos.findMany({
      where: eq(videos.creatorId, Number(creatorId)),
      orderBy: (videos, { desc }) => [desc(videos.createdAt)],
    });
    res.json(creatorVideos);
  });

  // Get creator's purchases
  app.get("/api/creator/purchases", async (req, res) => {
    const creatorId = req.query.creatorId;
    if (!creatorId) return res.status(400).send("Creator ID required");

    const creatorPurchases = await db.query.purchases.findMany({
      where: eq(purchases.buyerId, String(creatorId)),
      orderBy: (purchases, { desc }) => [desc(purchases.createdAt)],
    });
    res.json(creatorPurchases);
  });

  // Create new video
  app.post("/api/videos", async (req, res) => {
    const { title, description, price, videoUrl, creatorId } = req.body;
    
    try {
      const newVideo = await db.insert(videos).values({
        title,
        description,
        price,
        videoUrl,
        creatorId,
      }).returning();
      
      res.json(newVideo[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to create video" });
    }
  });

  // Create new purchase
  app.post("/api/purchases", async (req, res) => {
    const { videoId, buyerId, amount } = req.body;
    
    try {
      const newPurchase = await db.insert(purchases).values({
        videoId,
        buyerId,
        amount,
        status: "completed",
      }).returning();
      
      res.json(newPurchase[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to create purchase" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
