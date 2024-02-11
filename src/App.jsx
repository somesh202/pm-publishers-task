import React, { useState } from "react";
import axios from "axios";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const menuItems = [
    {
      component: "NavTitle",
      name: "INSTITUTE",
    },
    {
      component: "NavItem",
      name: "Home",
      to: "home",
      badge: {
        color: "info",
        text: "NEW",
      },
      permissionId: 8,
    },
    {
      component: "NavItem",
      name: "My Institutions",
      to: "my-institutions",
      permissionId: 3,
    },
    {
      component: "NavItem",
      name: "My Classes",
      to: "my-classes",
      badge: {
        color: "info",
        text: "NEW",
      },
      permissionId: 6,
    },
    {
      component: "NavGroup",
      name: "Analytics",
      to: "analytics",
      permissionId: 2,
      items: [
        {
          component: "NavItem",
          name: "Institute Overview",
          to: "analytics/data-overview",
          permissionId: 2,
        },
      ],
    },
    {
      component: "NavItem",
      name: "Knowledge Meter",
      to: "knowledge-meter",
      badge: {
        color: "info",
        text: "NEW",
      },
      permissionId: 2,
    },
    {
      component: "NavGroup",
      name: "Micro Learning",
      to: "micro-learning",
      permissionId: 4,
      items: [
        {
          component: "NavItem",
          name: "Management",
          to: "micro-learning/management",
          permissionId: 8,
        },
        {
          component: "NavItem",
          name: "Student View",
          to: "micro-learning/studentview",
          permissionId: 4,
        },
      ],
    },
    {
      component: "NavGroup",
      name: "My Tests",
      to: "tests",
      permissionId: 4,
      items: [
        {
          component: "NavItem",
          name: "Scheduled Tests",
          to: "tests/scheduled-tests",
          permissionId: 6,
        },
        {
          component: "NavItem",
          name: "Tests Repository",
          to: "tests/test-repository",
          permissionId: 6,
        },
        {
          component: "NavItem",
          name: "Reports",
          to: "tests/reports",
          permissionId: 6,
        },
      ],
    },
    {
      component: "NavTitle",
      name: "RESOURCE LINKS",
    },
    {
      component: "NavItem",
      name: "Assets",
      to: "assets",
      permissionId: 5,
    },
    {
      component: "NavItem",
      name: "Teacher Resources",
      to: "teacher-resources",
      permissionId: 2,
    },
    {
      component: "NavGroup",
      name: "Videos",
      to: "videos",
      permissionId: 2,
      items: [
        {
          component: "NavItem",
          name: "Concept Videos",
          to: "videos/concept-videos",
          permissionId: 3,
        },
      ],
    },
    {
      component: "NavGroup",
      name: "Question Bank",
      to: "questionbank",
      permissionId: 4,
      items: [
        {
          component: "NavItem",
          name: "Publisher Questions",
          to: "questionbank/pub-questions",
          permissionId: 5,
        },
        {
          component: "NavItem",
          name: "My Questions",
          to: "questionbank/my-questions",
          permissionId: 8,
        },
        {
          component: "NavItem",
          name: "My Institution Questions",
          to: "questionbank/institute-questions",
          permissionId: 4,
        },
      ],
    },
    {
      component: "NavItem",
      name: "Chapters & Topics",
      to: "chapter-topics",
      permissionId: 3,
    },
    {
      component: "NavGroup",
      name: "Teacher Training",
      to: "teacher-training",
      permissionId: 8,
      items: [
        {
          component: "NavItem",
          name: "Live Classes",
          to: "teacher-training/live-classes",
          permissionId: 4,
        },
        {
          component: "NavItem",
          name: "Training Materials",
          to: "teacher-training/training-material",
          permissionId: 5,
        },
      ],
    },
    {
      component: "NavItem",
      name: "Attendance",
      to: "attendance",
      permissionId: 5,
    },
    {
      component: "NavTitle",
      name: "ADMIN",
    },
    {
      component: "NavItem",
      name: "Administration",
      to: "administration",
      permissionId: 5,
    },
  ];

  const filteredItems = menuItems.filter((item) => {
    if (
      (item.permissionId && [3, 4].includes(item.permissionId)) ||
      (item.items &&
        item.items.some((child) => [5, 8].includes(child.permissionId)))
    ) {
      return true;
    }
    return false;
  });

  console.log(filteredItems);

  const sendRequest = async (item) => {
    try {
      const response = await axios.post(
        "https://pmponline.co.in/sdetest/requests.php",
        item,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        console.log("Request successful");
      } else {
        console.error("Request failed");
      }
    } catch (error) {
      console.error("Error occurred while sending request:", error.message);
    }
  };

  const processItems = async () => {
    while (filteredItems.length > 0) {
      const currItem = filteredItems.shift();
      await sendRequest(currItem);
    }
  };

  processItems();

  const handleRatingChange = async (newRating) => {
    setRating(newRating);
    try {
      const response = await axios.post(
        "https://pmponline.co.in/sdetest/requests.php", newRating,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error("Failed to send rating");
      }
    } catch (error) {
      console.error("Error occurred while sending rating:", error);
    }
  };

  return (
    <div>
      <h2>Rating</h2>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleRatingChange(value)}
          style={{
            cursor: "pointer",
            color: value <= rating ? "gold" : "gray",
            margin: "auto",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
