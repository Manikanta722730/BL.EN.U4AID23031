import { Notification } from '@/types/notification';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    _id: '1',
    title: 'Final Semester Results Declared',
    message: 'The results for the final semester examinations have been published. Please check your student portal for details.',
    notification_type: 'Result',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    _id: '2',
    title: 'Google Placement Drive',
    message: 'Google is visiting the campus for a recruitment drive for Software Engineering roles. Interested students must register by Friday.',
    notification_type: 'Placement',
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    _id: '3',
    title: 'Annual Cultural Fest - Aarohan',
    message: 'Get ready for Aarohan 2026! Registrations for various events are now open. Join us for three days of fun and talent.',
    notification_type: 'Event',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    _id: '4',
    title: 'Microsoft Internship Opportunity',
    message: 'Microsoft is offering summer internships for pre-final year students. GPA requirement: 8.5 and above.',
    notification_type: 'Placement',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    _id: '5',
    title: 'Mid-term Feedback Form',
    message: 'Please provide your feedback on the courses for the current semester. Your input helps us improve.',
    notification_type: 'Event',
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
  {
    _id: '6',
    title: 'Hackathon Results',
    message: 'Congratulations to the winners of the 24-hour CodeSprint hackathon! Check the winners list here.',
    notification_type: 'Result',
    timestamp: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
  }
];
