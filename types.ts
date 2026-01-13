
export enum Platform {
  INSTAGRAM = 'Instagram',
  TIKTOK = 'TikTok',
  YOUTUBE = 'YouTube',
  TWITTER = 'Twitter/X',
  FACEBOOK = 'Facebook',
  UNKNOWN = 'Unknown'
}

export interface VideoMetadata {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  platform: Platform;
  url: string;
}

export interface DownloadOption {
  quality: string;
  format: string;
  size: string;
  url: string;
}

export interface AnalysisResult {
  metadata: VideoMetadata;
  options: DownloadOption[];
}
