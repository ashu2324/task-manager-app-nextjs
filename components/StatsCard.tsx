"use client";

import { StatsProps } from "@/types";
import { Card, CardContent, Typography } from "@mui/material";

export default function StatsCard({ title, value }: StatsProps) {
  return (
    <Card className="bg-white shadow hover:shadow-lg transition">
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}