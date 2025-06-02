
/**
 * Seed Data Configuration
 * 
 * Creates dummy users and data for development and testing.
 */

import bcrypt from 'bcryptjs';
import User from '@/models/User';
import Partner from '@/models/Partner';
import CommunityPost from '@/models/CommunityPost';
import Tutorial from '@/models/Tutorial';
import Challenge from '@/models/Challenge';
import { logger } from '@/utils/logger';

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      logger.info('Database already seeded, skipping...');
      return;
    }

    logger.info('Seeding database with dummy data...');

    // Create dummy users
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('password123', saltRounds);

    // Dummy User
    const dummyUser = new User({
      name: 'John Doe',
      email: 'user@example.com',
      password: hashedPassword,
      role: 'user',
      location: 'New York, USA',
      bio: 'DIY enthusiast and weekend warrior',
      isVerified: true,
      preferences: {
        emailNotifications: true,
        browserNotifications: true,
        marketingEmails: false,
        showProfile: true,
        showProjects: true
      }
    });

    // Creator Account
    const creatorUser = new User({
      name: 'Sarah Creator',
      email: 'creator@example.com',
      password: hashedPassword,
      role: 'creator',
      location: 'Los Angeles, USA',
      bio: 'Professional woodworker and tutorial creator',
      isVerified: true,
      stats: {
        tutorialsCreated: 15,
        projectsCompleted: 45,
        totalViews: 10000,
        totalEarnings: 2500
      },
      preferences: {
        emailNotifications: true,
        browserNotifications: true,
        marketingEmails: true,
        showProfile: true,
        showProjects: true
      }
    });

    // Partner Admin
    const partnerUser = new User({
      name: 'Mike Partner',
      email: 'partner@example.com',
      password: hashedPassword,
      role: 'partner',
      location: 'Chicago, USA',
      bio: 'Business partner representing craft supply stores',
      isVerified: true,
      preferences: {
        emailNotifications: true,
        browserNotifications: true,
        marketingEmails: true,
        showProfile: true,
        showProjects: false
      }
    });

    // Admin User
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      location: 'San Francisco, USA',
      bio: 'Platform administrator',
      isVerified: true,
      preferences: {
        emailNotifications: true,
        browserNotifications: true,
        marketingEmails: false,
        showProfile: false,
        showProjects: false
      }
    });

    const users = await User.insertMany([dummyUser, creatorUser, partnerUser, adminUser]);
    logger.info(`Created ${users.length} dummy users`);

    // Create partner record
    const partner = new Partner({
      name: 'CraftSupply Co.',
      email: 'partner@example.com',
      website: 'https://craftsupply.com',
      address: '123 Main St, Chicago, IL 60601',
      user: users[2]._id // Partner user
    });

    await partner.save();
    logger.info('Created partner record');

    // Create sample community posts
    const communityPosts = [
      {
        title: 'Welcome to CraftCircle!',
        content: 'This is our community space where DIY enthusiasts can share their projects, ask questions, and inspire each other.',
        author: users[1]._id, // Creator
        category: 'POSTED',
        tags: ['welcome', 'community'],
        isPinned: true
      },
      {
        title: 'Tips for Beginner Woodworkers',
        content: 'Here are some essential tips I wish I knew when starting my woodworking journey...',
        author: users[1]._id, // Creator
        category: 'PUBLISHED',
        tags: ['woodworking', 'tips', 'beginner']
      }
    ];

    const posts = await CommunityPost.insertMany(communityPosts);
    logger.info(`Created ${posts.length} community posts`);

    // Create sample tutorial
    const tutorial = new Tutorial({
      title: 'Build a Simple Wooden Coffee Table',
      description: 'Learn how to build a beautiful coffee table using basic woodworking tools and techniques.',
      content: 'This tutorial will guide you through creating a stunning coffee table...',
      category: 'furniture',
      tags: ['woodworking', 'furniture', 'coffee-table'],
      difficulty: 'intermediate',
      duration: 180, // 3 hours
      author: users[1]._id, // Creator
      thumbnail: '/uploads/coffee-table-thumb.jpg',
      status: 'published',
      materials: [
        {
          name: 'Pine Wood Boards',
          quantity: 4,
          unit: 'pieces',
          cost: 60,
          where_to_buy: 'Local lumber yard'
        },
        {
          name: 'Wood Screws',
          quantity: 20,
          unit: 'pieces',
          cost: 10
        }
      ],
      tools: [
        {
          name: 'Circular Saw',
          required: true
        },
        {
          name: 'Drill',
          required: true
        },
        {
          name: 'Sandpaper',
          required: true
        }
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'Cut the wood pieces',
          description: 'Measure and cut all wood pieces according to the plan.',
          duration: 30
        },
        {
          stepNumber: 2,
          title: 'Sand the pieces',
          description: 'Sand all cut pieces to ensure smooth surfaces.',
          duration: 45
        },
        {
          stepNumber: 3,
          title: 'Assemble the table',
          description: 'Join all pieces together using wood screws.',
          duration: 60
        }
      ]
    });

    await tutorial.save();
    logger.info('Created sample tutorial');

    // Create sample challenge
    const challenge = new Challenge({
      title: 'Upcycling Challenge: Transform Old Furniture',
      description: 'Give new life to old furniture pieces! Show us your creativity in transforming discarded items.',
      category: 'UPCYCLING',
      difficulty: 'INTERMEDIATE',
      duration: 30, // 30 days
      thumbnail: '/uploads/upcycling-challenge.jpg',
      requirements: [
        'Must use at least one piece of old/discarded furniture',
        'Document the before and after',
        'Share your process and materials used'
      ],
      prizes: ['$500 gift card', '$300 gift card', '$100 gift card'],
      rules: [
        'One submission per participant',
        'Must be your original work',
        'Submit by the deadline'
      ],
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      submissionDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days
      votingDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      status: 'active',
      creator: users[3]._id, // Admin
      judges: [users[1]._id, users[3]._id] // Creator and Admin
    });

    await challenge.save();
    logger.info('Created sample challenge');

    logger.info('Database seeded successfully!');
    
    // Log credentials for easy access
    logger.info('=== DUMMY USER CREDENTIALS ===');
    logger.info('Regular User: user@example.com / password123');
    logger.info('Creator: creator@example.com / password123');
    logger.info('Partner: partner@example.com / password123');
    logger.info('Admin: admin@example.com / password123');
    logger.info('===============================');

  } catch (error) {
    logger.error('Error seeding database:', error);
    throw error;
  }
}
