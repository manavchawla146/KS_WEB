export type GalleryItem = {
  title: string;
  date: string;
  img: string; // cover/thumbnail image used in the bento grid
  images: string[]; // full set of photos shown in the modal carousel for THIS category
  tag?: string;
  description?: string;
  highlights?: string[];
};

// Stock images (picsum.photos) used only for testing the carousel.
// Swap these out for real photos per category whenever they're ready —
// nothing else in the component needs to change.
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    title: "Annual Tech Fest",
    date: "March 2025",
    tag: "Technology",
    img: "https://picsum.photos/id/1015/1200/800",
    images: [
      "https://picsum.photos/id/1015/1200/800",
      "https://picsum.photos/id/1016/1200/800",
      "https://picsum.photos/id/1018/1200/800",
      "https://picsum.photos/id/1020/1200/800",
    ],
    description:
      "Three days of robotics, hackathons, and tech talks bringing together students from across the region.",
    highlights: [
      "40+ student-led projects showcased",
      "Guest talks from industry engineers",
      "Live robotics and coding competitions",
    ],
  },
  {
    title: "Convocation Ceremony",
    date: "April 2025",
    tag: "Graduation",
    img: "https://picsum.photos/id/1025/1200/800",
    images: [
      "https://picsum.photos/id/1025/1200/800",
      "https://picsum.photos/id/1027/1200/800",
      "https://picsum.photos/id/1031/1200/800",
    ],
    description:
      "Celebrating the graduating class with families, faculty, and distinguished guests.",
    highlights: [
      "500+ graduates honored",
      "Keynote address from an alumni founder",
      "Academic excellence awards presented",
    ],
  },
  {
    title: "Cultural Night",
    date: "February 2025",
    tag: "Culture",
    img: "https://picsum.photos/id/1035/1200/800",
    images: [
      "https://picsum.photos/id/1035/1200/800",
      "https://picsum.photos/id/1036/1200/800",
      "https://picsum.photos/id/1038/1200/800",
    ],
    description:
      "An evening of music, dance, and performances celebrating the diversity of our student body.",
    highlights: [
      "12 performances across genres",
      "Traditional and contemporary acts",
      "Open to families and the public",
    ],
  },
  {
    title: "Sports Day",
    date: "January 2025",
    tag: "Sports",
    img: "https://picsum.photos/id/1042/1200/800",
    images: [
      "https://picsum.photos/id/1042/1200/800",
      "https://picsum.photos/id/1044/1200/800",
      "https://picsum.photos/id/1045/1200/800",
    ],
    description:
      "Annual inter-house athletics meet featuring track, field, and team sports.",
    highlights: [
      "8 houses competing",
      "New record set in the 400m relay",
      "Closing ceremony with trophy presentation",
    ],
  },
  {
    title: "Workshop Series",
    date: "December 2024",
    tag: "Academic",
    img: "https://picsum.photos/id/1050/1200/800",
    images: [
      "https://picsum.photos/id/1050/1200/800",
      "https://picsum.photos/id/1051/1200/800",
      "https://picsum.photos/id/1052/1200/800",
    ],
    description:
      "Hands-on sessions covering design thinking, data analysis, and public speaking.",
    highlights: [
      "6 workshops over 2 weeks",
      "Led by faculty and visiting experts",
      "Certificates issued to all participants",
    ],
  },
  {
    title: "Fresher's Welcome",
    date: "August 2024",
    tag: "Community",
    img: "https://picsum.photos/id/1056/1200/800",
    images: [
      "https://picsum.photos/id/1056/1200/800",
      "https://picsum.photos/id/1059/1200/800",
      "https://picsum.photos/id/1060/1200/800",
    ],
    description:
      "Welcoming the incoming batch with orientation activities, games, and a campus tour.",
    highlights: [
      "First-year mixer and games",
      "Campus tour for new students",
      "Senior mentor introductions",
    ],
  },
];