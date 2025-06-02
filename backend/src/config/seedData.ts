
/**
 * Database Seed Data
 * 
 * Contains dummy data for development and testing purposes.
 * This file includes sample users, tutorials, projects, challenges, and other entities.
 */

import bcrypt from 'bcryptjs';
import User from '@/models/User';
import Tutorial from '@/models/Tutorial';
import Project from '@/models/Project';
import Challenge from '@/models/Challenge';
import CommunityPost from '@/models/CommunityPost';
import Partner from '@/models/Partner';
import ContentCreator from '@/models/ContentCreator';
import Subscription from '@/models/Subscription';
import Transaction from '@/models/Transaction';
import Video from '@/models/Video';
import { logger } from '@/utils/logger';

/**
 * Seed the database with dummy data
 */
export const seedDatabase = async () => {
  try {
    // Check if data already exists
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      logger.info('Database already seeded, skipping...');
      return;
    }

    logger.info('Seeding database with dummy data...');

    // Create dummy users with different roles
    const hashedPassword = await bcrypt.hash('password123', 12);

    const users = await User.create([
      {
        name: 'John Admin',
        email: 'admin@craftcircle.com',
        password: hashedPassword,
        role: 'admin',
        location: 'San Francisco, CA',
        bio: 'Platform administrator and DIY enthusiast',
        isVerified: true,
        stats: {
          tutorialsCreated: 0,
          projectsCompleted: 0,
          totalViews: 0,
          totalEarnings: 0
        },
        preferences: {
          emailNotifications: true,
          browserNotifications: true,
          marketingEmails: false,
          showProfile: true,
          showProjects: true
        }
      },
      {
        name: 'Sarah Creator',
        email: 'creator@craftcircle.com',
        password: hashedPassword,
        role: 'creator',
        location: 'Austin, TX',
        bio: 'Professional woodworker and content creator with 10+ years of experience',
        avatar: '/uploads/avatars/sarah-creator.jpg',
        website: 'https://sarahswoodworks.com',
        socialLinks: {
          youtube: 'https://youtube.com/sarahswoodworks',
          instagram: 'https://instagram.com/sarahswoodworks'
        },
        isVerified: true,
        stats: {
          tutorialsCreated: 15,
          projectsCompleted: 8,
          totalViews: 12500,
          totalEarnings: 2340.50
        },
        preferences: {
          emailNotifications: true,
          browserNotifications: true,
          marketingEmails: true,
          showProfile: true,
          showProjects: true
        }
      },
      {
        name: 'Mike Partner',
        email: 'partner@craftcircle.com',
        password: hashedPassword,
        role: 'partner',
        location: 'Seattle, WA',
        bio: 'Business partner managing tool supplies and materials',
        isVerified: true,
        stats: {
          tutorialsCreated: 0,
          projectsCompleted: 0,
          totalViews: 0,
          totalEarnings: 5600.00
        },
        preferences: {
          emailNotifications: true,
          browserNotifications: false,
          marketingEmails: true,
          showProfile: true,
          showProjects: false
        }
      },
      {
        name: 'Emma User',
        email: 'user@craftcircle.com',
        password: hashedPassword,
        role: 'user',
        location: 'Portland, OR',
        bio: 'DIY beginner, love upcycling and home decoration projects',
        avatar: '/uploads/avatars/emma-user.jpg',
        isVerified: false,
        stats: {
          tutorialsCreated: 0,
          projectsCompleted: 3,
          totalViews: 0,
          totalEarnings: 0
        },
        preferences: {
          emailNotifications: true,
          browserNotifications: true,
          marketingEmails: false,
          showProfile: true,
          showProjects: true
        }
      },
      {
        name: 'Alex Craftsman',
        email: 'alex@craftcircle.com',
        password: hashedPassword,
        role: 'creator',
        location: 'Denver, CO',
        bio: 'Furniture maker and upcycling expert. Teaching sustainable crafting since 2015.',
        avatar: '/uploads/avatars/alex-craftsman.jpg',
        website: 'https://alexcraftsman.com',
        socialLinks: {
          instagram: 'https://instagram.com/alexcraftsman',
          tiktok: 'https://tiktok.com/@alexcraftsman'
        },
        isVerified: true,
        stats: {
          tutorialsCreated: 8,
          projectsCompleted: 12,
          totalViews: 8900,
          totalEarnings: 1245.75
        },
        preferences: {
          emailNotifications: true,
          browserNotifications: true,
          marketingEmails: true,
          showProfile: true,
          showProjects: true
        }
      }
    ]);

    logger.info(`Created ${users.length} dummy users`);

    // Create content creator profiles for creators
    const contentCreators = await ContentCreator.create([
      {
        user: users[1]._id, // Sarah Creator
        creatorRating: 4.8,
        bio: 'Professional woodworker and content creator with 10+ years of experience. Specializing in sustainable furniture making and upcycling projects.',
        monthlyEarning: 850.25,
        totalEarning: 2340.50,
        verificationStatus: 'VERIFIED',
        socialLinks: {
          youtube: 'https://youtube.com/sarahswoodworks',
          instagram: 'https://instagram.com/sarahswoodworks',
          website: 'https://sarahswoodworks.com'
        },
        specialties: ['Woodworking', 'Furniture Making', 'Upcycling', 'Tool Reviews'],
        joinedDate: new Date('2023-01-15')
      },
      {
        user: users[4]._id, // Alex Craftsman
        creatorRating: 4.6,
        bio: 'Furniture maker and upcycling expert. Teaching sustainable crafting since 2015.',
        monthlyEarning: 645.50,
        totalEarning: 1245.75,
        verificationStatus: 'VERIFIED',
        socialLinks: {
          instagram: 'https://instagram.com/alexcraftsman',
          tiktok: 'https://tiktok.com/@alexcraftsman',
          website: 'https://alexcraftsman.com'
        },
        specialties: ['Upcycling', 'Sustainable Crafting', 'Furniture Restoration'],
        joinedDate: new Date('2023-03-20')
      }
    ]);

    logger.info(`Created ${contentCreators.length} content creator profiles`);

    // Create subscriptions
    const subscriptions = await Subscription.create([
      {
        user: users[1]._id, // Sarah Creator - Premium
        type: 'YEARLY',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        isActive: true,
        price: 99.99,
        nextPaymentDate: new Date('2024-12-31')
      },
      {
        user: users[3]._id, // Emma User - Free
        type: 'FREE',
        startDate: new Date('2024-05-15'),
        isActive: true,
        price: 0
      },
      {
        user: users[4]._id, // Alex Craftsman - Premium
        type: 'YEARLY',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2025-01-31'),
        isActive: true,
        price: 99.99,
        nextPaymentDate: new Date('2025-01-31')
      }
    ]);

    logger.info(`Created ${subscriptions.length} subscriptions`);

    // Create sample tutorials
    const tutorials = await Tutorial.create([
      {
        title: 'DIY Wooden Coffee Table',
        description: 'Learn how to build a beautiful rustic coffee table using reclaimed wood. Perfect for beginners!',
        content: 'In this comprehensive tutorial, we\'ll walk through every step of creating a stunning coffee table...',
        category: 'furniture',
        tags: ['woodworking', 'furniture', 'beginner', 'coffee-table'],
        difficulty: 'beginner',
        duration: 180,
        author: users[1]._id,
        thumbnail: '/uploads/tutorials/coffee-table-thumb.jpg',
        images: [
          '/uploads/tutorials/coffee-table-1.jpg',
          '/uploads/tutorials/coffee-table-2.jpg',
          '/uploads/tutorials/coffee-table-3.jpg'
        ],
        videoUrl: 'https://youtube.com/watch?v=example1',
        materials: [
          { name: 'Reclaimed Wood Planks', quantity: 4, unit: 'pieces', cost: 80, where_to_buy: 'Local lumber yard' },
          { name: 'Wood Screws', quantity: 20, unit: 'pieces', cost: 15, where_to_buy: 'Hardware store' },
          { name: 'Wood Stain', quantity: 1, unit: 'bottle', cost: 25, where_to_buy: 'Hardware store' }
        ],
        tools: [
          { name: 'Circular Saw', required: true },
          { name: 'Drill', required: true },
          { name: 'Sandpaper', required: true },
          { name: 'Router', required: false, alternative: 'Can be done by hand' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Prepare the Wood',
            description: 'Cut all wood pieces to the required dimensions and sand them smooth.',
            duration: 45,
            tips: ['Always measure twice, cut once', 'Use 120-grit sandpaper for best results']
          },
          {
            stepNumber: 2,
            title: 'Assemble the Frame',
            description: 'Join the frame pieces using wood screws and ensure everything is square.',
            duration: 60,
            tips: ['Use clamps to hold pieces in place', 'Check diagonals to ensure squareness']
          }
        ],
        status: 'published',
        isPremium: false,
        stats: {
          views: 2450,
          likes: 187,
          dislikes: 12,
          favorites: 89,
          completions: 45,
          averageRating: 4.6,
          totalRatings: 78
        },
        publishedAt: new Date('2024-01-15')
      },
      {
        title: 'Upcycled Pallet Garden Planter',
        description: 'Transform old shipping pallets into beautiful garden planters for your herbs and vegetables.',
        content: 'This eco-friendly project shows you how to give new life to old pallets...',
        category: 'upcycling',
        tags: ['upcycling', 'gardening', 'sustainable', 'outdoor'],
        difficulty: 'beginner',
        duration: 90,
        author: users[4]._id,
        thumbnail: '/uploads/tutorials/pallet-planter-thumb.jpg',
        images: [
          '/uploads/tutorials/pallet-planter-1.jpg',
          '/uploads/tutorials/pallet-planter-2.jpg'
        ],
        materials: [
          { name: 'Wooden Pallet', quantity: 2, unit: 'pieces', cost: 0, where_to_buy: 'Free from local businesses' },
          { name: 'Landscape Fabric', quantity: 2, unit: 'yards', cost: 20, where_to_buy: 'Garden center' },
          { name: 'Potting Soil', quantity: 4, unit: 'bags', cost: 60, where_to_buy: 'Garden center' }
        ],
        tools: [
          { name: 'Hammer', required: true },
          { name: 'Staple Gun', required: true },
          { name: 'Sandpaper', required: true }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Prepare the Pallets',
            description: 'Clean and sand the pallets, removing any splinters or rough edges.',
            duration: 30,
            tips: ['Check for nails and remove any loose ones']
          }
        ],
        status: 'published',
        isPremium: false,
        stats: {
          views: 1876,
          likes: 154,
          dislikes: 8,
          favorites: 67,
          completions: 32,
          averageRating: 4.4,
          totalRatings: 56
        },
        publishedAt: new Date('2024-02-10')
      }
    ]);

    logger.info(`Created ${tutorials.length} sample tutorials`);

    // Create sample projects
    const projects = await Project.create([
      {
        title: 'My Kitchen Island Build',
        description: 'Building a custom kitchen island with storage and seating for my home renovation.',
        user: users[3]._id,
        tutorial: tutorials[0]._id,
        status: 'IN_PROGRESS',
        difficulty: 'INTERMEDIATE',
        category: 'FURNITURE_BUILDING',
        tags: ['kitchen', 'island', 'storage'],
        images: ['/uploads/projects/kitchen-island-1.jpg'],
        materials: [
          { name: 'Plywood Sheets', quantity: 3, unit: 'sheets', cost: 120 },
          { name: 'Cabinet Hardware', quantity: 1, unit: 'set', cost: 85 }
        ],
        progress: {
          currentStep: 3,
          totalSteps: 8,
          completedSteps: [1, 2],
          percentage: 37.5
        },
        timeTracking: {
          estimatedHours: 20,
          actualHours: 8,
          sessions: [
            {
              startTime: new Date('2024-05-01T09:00:00Z'),
              endTime: new Date('2024-05-01T13:00:00Z'),
              duration: 240,
              notes: 'Cut all the main pieces'
            }
          ]
        },
        budget: {
          estimated: 400,
          actual: 205,
          currency: 'USD'
        },
        notes: 'Taking my time with this project. Want to make sure everything is perfect.',
        isPublic: true,
        likes: 23,
        views: 156
      },
      {
        title: 'Bedroom Floating Shelves',
        description: 'Simple floating shelves for bedroom organization and decoration.',
        user: users[3]._id,
        status: 'COMPLETED',
        difficulty: 'BEGINNER',
        category: 'ORGANISATION',
        tags: ['shelves', 'bedroom', 'organization'],
        images: [
          '/uploads/projects/floating-shelves-1.jpg',
          '/uploads/projects/floating-shelves-2.jpg'
        ],
        materials: [
          { name: 'Pine Boards', quantity: 3, unit: 'pieces', cost: 45 },
          { name: 'Floating Shelf Brackets', quantity: 6, unit: 'pieces', cost: 30 }
        ],
        progress: {
          currentStep: 5,
          totalSteps: 5,
          completedSteps: [1, 2, 3, 4, 5],
          percentage: 100
        },
        timeTracking: {
          estimatedHours: 6,
          actualHours: 5.5,
          sessions: [
            {
              startTime: new Date('2024-04-15T10:00:00Z'),
              endTime: new Date('2024-04-15T15:30:00Z'),
              duration: 330,
              notes: 'Completed entire project in one session'
            }
          ]
        },
        budget: {
          estimated: 80,
          actual: 75,
          currency: 'USD'
        },
        notes: 'Really happy with how these turned out!',
        isPublic: true,
        likes: 45,
        views: 234,
        completedAt: new Date('2024-04-15')
      }
    ]);

    logger.info(`Created ${projects.length} sample projects`);

    // Create sample challenges
    const challenges = await Challenge.create([
      {
        title: 'Sustainable Furniture Challenge',
        description: 'Create a piece of furniture using only recycled or upcycled materials. Show us your creativity in giving new life to old items!',
        category: 'UPCYCLING',
        difficulty: 'INTERMEDIATE',
        duration: 30,
        thumbnail: '/uploads/challenges/sustainable-furniture-thumb.jpg',
        images: ['/uploads/challenges/sustainable-furniture-1.jpg'],
        requirements: [
          'Must use at least 70% recycled materials',
          'Document the before and after transformation',
          'Include a materials cost breakdown'
        ],
        prizes: [
          '1st Place: $500 gift card + Featured creator spotlight',
          '2nd Place: $250 gift card',
          '3rd Place: $100 gift card'
        ],
        rules: [
          'One submission per participant',
          'Must be completed within the challenge period',
          'Original work only',
          'Follow safety guidelines at all times'
        ],
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-30'),
        submissionDeadline: new Date('2024-06-30T23:59:59Z'),
        votingDeadline: new Date('2024-07-07T23:59:59Z'),
        status: 'active',
        creator: users[0]._id,
        judges: [users[1]._id, users[4]._id],
        stats: {
          participants: 23,
          submissions: 18,
          totalVotes: 0
        }
      }
    ]);

    logger.info(`Created ${challenges.length} sample challenges`);

    // Create sample community posts
    const communityPosts = await CommunityPost.create([
      {
        title: 'Best beginner woodworking tools?',
        content: 'Hi everyone! I\'m just starting my woodworking journey and feeling overwhelmed by all the tool options. What are the essential tools you\'d recommend for a complete beginner? I have a budget of around $300 to start with.',
        author: users[3]._id,
        category: 'POSTED',
        tags: ['beginner', 'tools', 'advice'],
        status: 'open',
        stats: {
          views: 156,
          replies: 12,
          likes: 23,
          lastActivity: new Date()
        }
      },
      {
        title: 'Show off your workshop setup!',
        content: 'I\'d love to see everyone\'s workshop setups for inspiration. Just finished organizing mine and it feels so much more productive. Share photos of your creative spaces!',
        author: users[1]._id,
        category: 'POSTED',
        tags: ['workshop', 'organization', 'inspiration'],
        status: 'open',
        isPinned: true,
        imageUrl: '/uploads/posts/workshop-setup.jpg',
        stats: {
          views: 342,
          replies: 28,
          likes: 67,
          lastActivity: new Date()
        }
      }
    ]);

    logger.info(`Created ${communityPosts.length} sample community posts`);

    // Create partner information
    const partners = await Partner.create([
      {
        name: 'Seattle Tool Supply',
        email: 'partner@seattletoolsupply.com',
        website: 'https://seattletoolsupply.com',
        address: '123 Tool Street, Seattle, WA 98101',
        user: users[2]._id
      }
    ]);

    logger.info(`Created ${partners.length} partner records`);

    // Create sample transactions
    const transactions = await Transaction.create([
      {
        user: users[1]._id,
        transactionId: 'txn_sarah_premium_2024',
        transactionDate: new Date('2024-01-01'),
        totalPrice: 99.99,
        transactionType: 'SUBSCRIPTION',
        status: 'COMPLETED',
        paymentMethod: 'Credit Card',
        description: 'Yearly Premium Subscription'
      },
      {
        user: users[4]._id,
        transactionId: 'txn_alex_premium_2024',
        transactionDate: new Date('2024-02-01'),
        totalPrice: 99.99,
        transactionType: 'SUBSCRIPTION',
        status: 'COMPLETED',
        paymentMethod: 'PayPal',
        description: 'Yearly Premium Subscription'
      }
    ]);

    logger.info(`Created ${transactions.length} sample transactions`);

    // Create sample videos
    const videos = await Video.create([
      {
        title: 'Coffee Table Build Timelapse',
        url: 'https://youtube.com/watch?v=example1',
        uploadDate: new Date('2024-01-16'),
        description: 'Watch the complete coffee table build in this satisfying timelapse video.',
        thumbnail: '/uploads/videos/coffee-table-timelapse-thumb.jpg',
        duration: 300, // 5 minutes
        views: 1250,
        likes: 89,
        associatedTutorial: tutorials[0]._id,
        uploader: users[1]._id
      },
      {
        title: 'Pallet Planter Quick Build',
        url: 'https://youtube.com/watch?v=example2',
        uploadDate: new Date('2024-02-11'),
        description: 'Quick and easy pallet planter build perfect for beginners.',
        thumbnail: '/uploads/videos/pallet-planter-thumb.jpg',
        duration: 180, // 3 minutes
        views: 876,
        likes: 67,
        associatedTutorial: tutorials[1]._id,
        uploader: users[4]._id
      }
    ]);

    logger.info(`Created ${videos.length} sample videos`);

    logger.info('✅ Database seeded successfully with comprehensive dummy data!');
    logger.info(`
📊 Seeded Data Summary:
   • ${users.length} Users (Admin, Creators, Partner, Regular Users)
   • ${contentCreators.length} Content Creator Profiles
   • ${subscriptions.length} Subscriptions (Free & Premium)
   • ${tutorials.length} Tutorials with Materials & Steps
   • ${projects.length} User Projects with Progress Tracking
   • ${challenges.length} Active Challenges
   • ${communityPosts.length} Community Posts
   • ${partners.length} Business Partners
   • ${transactions.length} Financial Transactions
   • ${videos.length} Video Content

🔐 Test Account Credentials (password: password123):
   • Admin: admin@craftcircle.com
   • Creator: creator@craftcircle.com  
   • Partner: partner@craftcircle.com
   • User: user@craftcircle.com
   • Creator 2: alex@craftcircle.com
    `);

  } catch (error) {
    logger.error('Error seeding database:', error);
    throw error;
  }
};
