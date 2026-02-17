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
    title: 'Basic Electronics by Engineering Funda',
    description: 'Basic Electronics by Engineering Funda',
    thumbnail: getYouTubeThumbnail('https://youtu.be/hYv113KcelU?si=q0kyd36YQuetmBI9'),
    duration: '4:04',
    channel: 'Engineering Funda',
    url: 'https://youtu.be/hYv113KcelU?si=q0kyd36YQuetmBI9',
    category: 'Algorithms',
  },
  {
    id: 4,
    title: 'Energy Bands and Classification of Solid Material in Electronics Devices & Circuits',
    description: 'Energy Bands and Classification of Solid Material in Electronics Devices & Circuits',
    thumbnail: getYouTubeThumbnail('https://youtu.be/3ouUu1cJ56A?si=dVHsowntIX2Ybjya'),
    duration: '11:19',
    channel: 'Engineering Funda',
    url: 'https://youtu.be/3ouUu1cJ56A?si=dVHsowntIX2Ybjya',
    category: 'Algorithms',
  },
  {
    id: 5,
    title: 'VI Characteristics of PN Junction Diode | PN Junction Forward Bias | PN Junction Reverse Bias',
    description: 'VI Characteristics of PN Junction Diode | PN Junction Forward Bias | PN Junction Reverse Bias',
    thumbnail: getYouTubeThumbnail('https://youtu.be/OkyKCNvKJI4?si=8bPt_KjBkoi_k0Rt'),
    duration: '9:36',
    channel: 'Engineering Funda',
    url: 'https://youtu.be/OkyKCNvKJI4?si=8bPt_KjBkoi_k0Rt',
    category: 'System Design',
  },
 {
    id: 6,
    title: 'Introduction to Relations',
    description: 'Introduction to Relations',
    thumbnail: getYouTubeThumbnail('https://youtu.be/dbihQ6tiRJ0?si=i69CuMht9iW1DgFg'),
    duration: '10:27',
    channel: 'Kimberly Brehm',
    url: 'https://youtu.be/dbihQ6tiRJ0?si=i69CuMht9iW1DgFg',
    category: 'System Design',
  },
   {
    id: 7,
    title: ' Propositions, Negations, Conjunctions and Disjunctions',
    description: ' Propositions, Negations, Conjunctions and Disjunctions',
    thumbnail: getYouTubeThumbnail('https://youtu.be/A3Ffwsnad0k?si=dTMSN9FN9Z3CuLMh'),
    duration: '19:31',
    channel: 'Kimberly Brehm',
    url: 'https://youtu.be/A3Ffwsnad0k?si=dTMSN9FN9Z3CuLMh',
    category: 'System Design',
  },
   {
    id: 8,
    title: ' Implications Converse, Inverse, Contrapositive, and Biconditionals',
    description: 'Implications Converse, Inverse, Contrapositive, and Biconditionals',
    thumbnail: getYouTubeThumbnail('https://youtu.be/rAxXcX_w5fE?si=xdRhwZS53nfrbBzv'),
    duration: '19:04',
    channel: 'Kimberly Brehm',
    url: 'https://youtu.be/rAxXcX_w5fE?si=xdRhwZS53nfrbBzv',
    category: 'System Design',
  },
   {
    id: 9,
    title: 'Constructing a Truth Table for Compound Propositions',
    description: 'Constructing a Truth Table for Compound Propositions',
    thumbnail: getYouTubeThumbnail('https://youtu.be/hWEZsyF3ZZc?si=hqhqgv0Nb5lw9rza'),
    duration: '11:44',
    channel: 'Kimberly Brehm',
    url: 'https://youtu.be/hWEZsyF3ZZc?si=hqhqgv0Nb5lw9rza',
    category: 'System Design',
  },
    {
    id: 10,
    title: 'Translating Propositional Logic Statements',
    description: 'Translating Propositional Logic Statements',
    thumbnail: getYouTubeThumbnail('https://youtu.be/A2k3ulOJ3u4?si=Unour-yIWIierGhJ'),
    duration: '11:09',
    channel: 'Kimberly Brehm',
    url: 'https://youtu.be/A2k3ulOJ3u4?si=Unour-yIWIierGhJ',
    category: 'System Design',
  },
  {
    id: 11,
    title: 'Learn All English Verb Tenses (Easiest Method)',
    description: 'Learn All English Verb Tenses (Easiest Method)',
    thumbnail: getYouTubeThumbnail('https://youtu.be/sCiG6rlk2Bc?si=tsYYF2YPpURjfC5q'),
    duration: '8:52',
    channel: 'Brian Wiles',
    url: 'https://youtu.be/sCiG6rlk2Bc?si=tsYYF2YPpURjfC5q',
    category: 'English',
  },
  {
    id: 12,
    title: 'Diodes Explained - The basics how diodes work working principle pn junction',
    description: 'Diodes Explained - The basics how diodes work working principle pn junction',
    thumbnail: getYouTubeThumbnail('https://youtu.be/Fwj_d3uO5g8?si=Dx1X2mkYWgtNxQXP'),
    duration: '11:31',
    channel: 'The Engineering Mindset',
    url: 'https://youtu.be/Fwj_d3uO5g8?si=Dx1X2mkYWgtNxQXP',
    category: 'Basic Electronics',
  },

   {
    id: 13,
    title: 'Diode Ratings | Voltage Ratings of Diode | Current Ratings of Diode | Power Ratings of Diode',
    description: 'Diode Ratings | Voltage Ratings of Diode | Current Ratings of Diode | Power Ratings of Diode',
    thumbnail: getYouTubeThumbnail('https://youtu.be/V9El0dMVK4s?si=ki1xPMnlc9lNE2WM'),
    duration: '09:10',
    channel: 'Engineering Funda',
    url: 'https://youtu.be/V9El0dMVK4s?si=ki1xPMnlc9lNE2WM',
    category: 'Basic Electronics',
  },
    {
    id: 14,
    title: 'Half Wave Rectifier (Basics, Circuit, Working & Waveforms) Explained',
    description: 'Half Wave Rectifier (Basics, Circuit, Working & Waveforms) Explained',
    thumbnail: getYouTubeThumbnail('https://youtu.be/Em1w5BE9DCI?si=1HSNLps3z4iUeVXn'),
    duration: '06:39',
    channel: 'Engineering Funda',
    url: 'https://youtu.be/Em1w5BE9DCI?si=1HSNLps3z4iUeVXn',
    category: 'Basic Electronics',
  },
  {
    id: 15,
    title: 'Parameters of Half Wave Rectifier (Average & RMS DC voltage/Current, PIV, Form & Ripple Factor)',
    description: 'Parameters of Half Wave Rectifier (Average & RMS DC voltage/Current, PIV, Form & Ripple Factor)',
    thumbnail: getYouTubeThumbnail('https://youtu.be/fF_AAR_EGcs?si=zSOknpcvOken8JPY'),
    duration: '10:20',
    channel: 'Engineering Funda',
    url: 'https://youtu.be/fF_AAR_EGcs?si=zSOknpcvOken8JPY',
    category: 'Basic Electronics',
  },
   {
    id: 16,
    title: 'Full Wave Rectifier (Basics, Circuit, Working & Waveforms) Explained',
    description: 'Full Wave Rectifier (Basics, Circuit, Working & Waveforms) Explained',
    thumbnail: getYouTubeThumbnail('https://youtu.be/tgNZdy2Ot7g?si=FIZQGM9RLHtm7ERa'),
    duration: '8:50',
    channel: 'Engineering Funda',
    url: 'https://youtu.be/tgNZdy2Ot7g?si=FIZQGM9RLHtm7ERa',
    category: 'Basic Electronics',
  },
     {
    id: 17,
    title: 'Full Wave Bridge Rectifier (Basics, Circuit, Working & Waveforms) Explained',
    description: 'Full Wave Bridge Rectifier (Basics, Circuit, Working & Waveforms) Explained',
    thumbnail: getYouTubeThumbnail('https://youtu.be/T3iWH8AnHi4?si=xVxzpGPlXchG71XT'),
    duration: '09:12',
    channel: 'Engineering Funda',
    url: 'https://youtu.be/T3iWH8AnHi4?si=xVxzpGPlXchG71XT',
    category: 'Basic Electronics',
  },
   {
    id: 18,
    title: 'Parameters of Full Wave Rectifier (Average & RMS DC voltage/Current, PIV, Form & Ripple Factor)',
    description: 'Parameters of Full Wave Rectifier (Average & RMS DC voltage/Current, PIV, Form & Ripple Factor)',
    thumbnail: getYouTubeThumbnail('https://youtu.be/IsNvwBSgkpk?si=q93etj64iL3IaBm5'),
    duration: '12:34',
    channel: 'Engineering Funda',
    url: 'https://youtu.be/IsNvwBSgkpk?si=q93etj64iL3IaBm5',
    category: 'Basic Electronics',
  },
   {
    id: 19,
    title: 'Half Wave Rectifier Vs Full Wave Rectifier Vs Bridge Rectifier, Rectifier Comparison with Parameters',
    description: 'Half Wave Rectifier Vs Full Wave Rectifier Vs Bridge Rectifier, Rectifier Comparison with Parameters',
    thumbnail: getYouTubeThumbnail('https://youtu.be/Dm2eQit0kzE?si=hVpaWtYsm8d6mIax'),
    duration: '12:11',
    channel: 'Engineering Funda',
    url: 'https://youtu.be/Dm2eQit0kzE?si=hVpaWtYsm8d6mIax',
    category: 'Basic Electronics',
  },
   {
    id: 20,
    title: 'Requirements of Filters in Rectifier | Filter Basics in Rectifier | Need of Filters in Rectifier',
    description: 'Requirements of Filters in Rectifier | Filter Basics in Rectifier | Need of Filters in Rectifier',
    thumbnail: getYouTubeThumbnail('https://youtu.be/-FPocpjUi8E?si=M9jzV5V375CFDoO2'),
    duration: '08:46',
    channel: 'Engineering Funda',
    url: 'https://youtu.be/-FPocpjUi8E?si=M9jzV5V375CFDoO2',
    category: 'Basic Electronics',
  },
  {
    id: 21,
    title: 'Capacitor Filter in Rectifier (Basics, Working, Waveforms & Drawbacks) Explained',
    description: 'Capacitor Filter in Rectifier (Basics, Working, Waveforms & Drawbacks) Explained',
    thumbnail: getYouTubeThumbnail('https://youtu.be/ZMys3FkI9RM?si=nucustf8CeEWZb15'),
    duration: '12:05',
    channel: 'Engineering Funda',
    url: 'https://youtu.be/ZMys3FkI9RM?si=nucustf8CeEWZb15',
    category: 'Basic Electronics',
  },
   {
    id: 22,
    title: 'Introduction to Flowcharts | Flowcharts Tutorial for Beginners & Students | Flowchart Basics Part 1',
    description: 'Introduction to Flowcharts | Flowcharts Tutorial for Beginners & Students | Flowchart Basics Part 1',
    thumbnail: getYouTubeThumbnail('https://youtu.be/HecufBrsowY?si=xvdC4siedkPoalja'),
    duration: '06:31',
    channel: 'Doctor J ',
    url: 'https://youtu.be/HecufBrsowY?si=xvdC4siedkPoalja',
    category: 'Basic Electronics',
  },
   {
    id: 23,
    title: 'Flowchart Sum and Average | Flowcharts Tutorial for Beginners & Students | Flowchart Basics Part 2',
    description: 'Flowchart Sum and Average | Flowcharts Tutorial for Beginners & Students | Flowchart Basics Part 2',
    thumbnail: getYouTubeThumbnail('https://youtu.be/oIVMAWeofhw?si=pCxB9Z5lY6zibICb'),
    duration: '07:10',
    channel: 'Doctor J ',
    url: 'https://youtu.be/oIVMAWeofhw?si=pCxB9Z5lY6zibICb',
    category: 'Basic Electronics',
  },
   {
    id: 24,
    title: 'Calculations in Flowcharts | Flowcharts Tutorial for Beginners & Students | Flowchart Basics Part 3',
    description: 'Calculations in Flowcharts | Flowcharts Tutorial for Beginners & Students | Flowchart Basics Part 3',
    thumbnail: getYouTubeThumbnail('https://youtu.be/mbo4su6kST8?si=Ax1Cb7HmTge4kYhM'),
    duration: '09:35',
    channel: 'Doctor J ',
    url: 'https://youtu.be/mbo4su6kST8?si=Ax1Cb7HmTge4kYhM',
    category: 'Basic Electronics',
  },
  {
    id: 25,
    title: 'Flowcharts: Conditions & Operators | Flowcharts Tutorial for Beginners | Flowchart Basics Part 4',
    description: 'Flowcharts: Conditions & Operators | Flowcharts Tutorial for Beginners | Flowchart Basics Part 4',
    thumbnail: getYouTubeThumbnail('https://youtu.be/Gy22RzKdeGY?si=naUzN07TnyOdoCST'),
    duration: '07:17',
    channel: 'Doctor J ',
    url: 'https://youtu.be/Gy22RzKdeGY?si=naUzN07TnyOdoCST',
    category: 'Basic Electronics',
  },

  {
    id: 26,
    title: 'Introduction to Relational Data Model',
    description: 'Introduction to Relational Data Model',
    thumbnail: getYouTubeThumbnail('https://youtu.be/Q45sr5p_NmQ?si=EeWvTwimgKcQWDSp'),
    duration: '06:52',
    channel: 'Doctor J ',
    url: 'https://youtu.be/Q45sr5p_NmQ?si=EeWvTwimgKcQWDSp',
    category: 'Basic Electronics',
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
