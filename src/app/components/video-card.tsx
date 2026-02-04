import { Play, Clock, ExternalLink } from 'lucide-react';

interface VideoCardProps {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  channel: string;
  url: string;
}

export function VideoCard({ title, description, thumbnail, duration, channel, url }: VideoCardProps) {
  return (
    <div className="group rounded-xl md:rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-white/5 overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center group-hover:scale-110 transition-all">
            <Play className="w-5 h-5 md:w-6 md:h-6 text-black ml-1" fill="black" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-sm flex items-center gap-1">
          <Clock className="w-3 h-3 text-white" />
          <span className="text-xs text-white font-semibold">{duration}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5" style={{ background: 'var(--glass-gradient)' }}>
        <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors text-sm md:text-base">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground truncate">{channel}</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-2 flex-shrink-0"
          >
            <span className="text-white text-xs md:text-sm font-semibold">Watch</span>
            <ExternalLink className="w-3 h-3 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}