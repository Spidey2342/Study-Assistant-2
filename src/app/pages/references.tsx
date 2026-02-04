import { TopBar } from '@/app/components/topbar';
import { VideoCard } from '@/app/components/video-card';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const courses = [
  'All Courses',
  ' Computer Science',
  'Algorithms',
  'System Design',
  'Databases',
  'Operating Systems',
  'Networking',
];


const videos = [
  {
    id: 1,
    title: 'Harvard CS50 – Full Computer Science University Course',
    description: 'Learn the basics of computer science from Harvard University. This is CS50, an introduction to the intellectual enterprises of computer science and the art of programming.',
    thumbnail: getYouTubeThumbnail('https://youtu.be/8mAITcNt710'),
    duration: '24:51:37',
    channel: 'freeCodeCamp.org',
    url: 'https://youtu.be/8mAITcNt710?si=PvMqAa6l1jcOgwCQ',
    category: 'Computer Science',
  },
  {
    id: 2,
    title: 'Operating Systems Course for Beginners',
    description: 'Learn fundamental and advanced operating system concepts in 25 hours. This course will give you a comprehensive understanding of how operating systems function and manage resources.',
    thumbnail: getYouTubeThumbnail('https://youtu.be/yK1uBHPdp30?si=ErMi3dOmWeM7f79P'),
    duration: '1:00:51:55',
    channel: 'CS Dojo',
    url: 'https://youtu.be/yK1uBHPdp30?si=ErMi3dOmWeM7f79P',
    category: 'Data Structures',
  },
  {
    id: 3,
    title: 'Dynamic Programming - Learn to Solve Algorithmic Problems',
    description: 'Understand the fundamentals of dynamic programming and learn patterns to solve complex optimization problems.',
    thumbnail: 'https://images.unsplash.com/photo-1660810731526-0720827cbd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwd29ya3NwYWNlfGVufDF8fHx8MTc2OTg0NDgwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5:12:30',
    channel: 'Abdul Bari',
    url: 'https://youtube.com',
    category: 'Algorithms',
  },
  {
    id: 4,
    title: 'Graph Algorithms for Technical Interviews',
    description: 'Learn BFS, DFS, shortest path algorithms, and how to approach graph problems in coding interviews.',
    thumbnail: 'https://images.unsplash.com/photo-1569653402334-2e98fbaa80ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNjaWVuY2UlMjBlZHVjYXRpb258ZW58MXx8fHwxNzY5ODQ0ODA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '3:45:20',
    channel: 'William Fiset',
    url: 'https://youtube.com',
    category: 'Algorithms',
  },
  {
    id: 5,
    title: 'System Design Interview Preparation',
    description: 'Complete guide to system design interviews covering scalability, databases, caching, and distributed systems.',
    thumbnail: 'https://images.unsplash.com/photo-1618422168439-4b03d3a05b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB0dXRvcmlhbCUyMHNjcmVlbnxlbnwxfHx8fDE3Njk3OTc0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '6:22:10',
    channel: 'Gaurav Sen',
    url: 'https://youtube.com',
    category: 'System Design',
  },
  {
    id: 6,
    title: 'Database Design and SQL Fundamentals',
    description: 'Learn database normalization, indexing, query optimization, and advanced SQL techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGxhcHRvcCUyMGNvZGV8ZW58MXx8fHwxNzY5Nzc5NDM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4:15:55',
    channel: 'Programming with Mosh',
    url: 'https://youtube.com',
    category: 'Databases',
  },
];

function getYouTubeId(url: string) {
  const match =
    url.match(/youtu\.be\/([^?]+)/) ||
    url.match(/v=([^&]+)/);

  return match ? match[1] : null;
}

function getYouTubeEmbedUrl(url: string) {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url;
}

function getYouTubeThumbnail(url: string) {
  const id = getYouTubeId(url);
  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : '';
}

export function ReferencesPage() {
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();

  const filteredVideos =
    selectedCourse === 'All Courses'
      ? videos
      : videos.filter((video) => video.category === selectedCourse);

  return (
    <div className="h-full flex flex-col">
      <TopBar title="References" onMenuClick={onMenuClick} />

      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Video References
            </h1>
            <p className="text-muted-foreground">
              Curated learning resources from top educators
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                {...video}
                onPlay={(url) => setActiveVideo(getYouTubeEmbedUrl(url))}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 🎬 Video Modal */}
  {activeVideo && (
  <div
    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={() => setActiveVideo(null)} // 👈 close on backdrop click
  >
    <div
      className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black"
      onClick={(e) => e.stopPropagation()} // 👈 prevent accidental close
    >
      {/* Close Button */}
      <button
        onClick={() => setActiveVideo(null)}
        className="absolute top-3 right-3 z-50 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition"
        aria-label="Close video"
      >
        ✕
      </button>

      {/* Video */}
      <iframe
        src={activeVideo}
        className="w-full h-full"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  </div>
)}

    </div>
  );
}
