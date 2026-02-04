import { TopBar } from '@/app/components/topbar';
import { VideoCard } from '@/app/components/video-card';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const courses = [
  'All Courses',
  'Data Structures',
  'Algorithms',
  'System Design',
  'Databases',
  'Operating Systems',
  'Networking',
];

const videos = [
  {
    id: 1,
    title: 'Complete Data Structures and Algorithms Tutorial',
    description: 'Master all fundamental data structures from arrays to graphs with practical examples and problem-solving techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1618422168439-4b03d3a05b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB0dXRvcmlhbCUyMHNjcmVlbnxlbnwxfHx8fDE3Njk3OTc0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4:32:15',
    channel: 'freeCodeCamp.org',
    url: 'https://youtube.com',
    category: 'Data Structures',
  },
  {
    id: 2,
    title: 'Binary Trees & Binary Search Trees - Full Course',
    description: 'Deep dive into tree data structures, traversal algorithms, and solving complex tree problems.',
    thumbnail: 'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGxhcHRvcCUyMGNvZGV8ZW58MXx8fHwxNzY5Nzc5NDM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '2:18:45',
    channel: 'CS Dojo',
    url: 'https://youtube.com',
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

export function ReferencesPage() {
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { onMenuClick } = useOutletContext<{ onMenuClick: () => void }>();

  const filteredVideos = selectedCourse === 'All Courses'
    ? videos
    : videos.filter(video => video.category === selectedCourse);

  return (
    <div className="h-full flex flex-col">
      <TopBar title="References" onMenuClick={onMenuClick} />
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Video References</h1>
            <p className="text-sm md:text-base text-muted-foreground">Curated learning resources from top educators</p>
          </div>

          {/* Course Filter */}
          <div className="mb-6 md:mb-8">
            <label className="block text-xs md:text-sm text-muted-foreground mb-2">Filter by Course</label>
            <div className="relative w-full md:w-64">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-colors flex items-center justify-between text-sm md:text-base"
              >
                <span className="truncate">{selectedCourse}</span>
                <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ml-2 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-lg md:rounded-xl bg-popover backdrop-blur-xl border border-white/10 overflow-hidden shadow-lg z-10">
                  {courses.map((course) => (
                    <button
                      key={course}
                      onClick={() => {
                        setSelectedCourse(course);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 md:py-3 text-left hover:bg-white/5 transition-colors text-sm md:text-base ${
                        selectedCourse === course ? 'bg-indigo-500/10 text-indigo-400' : ''
                      }`}
                    >
                      {course}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Video Grid - 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm md:text-base text-muted-foreground">No videos found for this course.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}