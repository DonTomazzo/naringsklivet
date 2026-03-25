const aiterms = [
  // START på den nya kursen: 7 AI Terms You Should Know
  {
    id: "4",
    title: "7 AI Terms You Should Know",
    slug: "7-ai-terms",
    userid: "demo-user",
    image_url: "/7terms.png",
    author: "IBM Technology", // Kan uppdateras till ett specifikt namn
    logo_url: "/ibm.jpg",
    questions: [
      {
        id: "v-ai1",
        question_text: "7 AI Terms You Should Know - Video Lesson",
        question_type: "videolesson",
        question_order: 1,
        video_url: "https://www.youtube.com/embed/VSFuqMh4hus", // Din video-URL
        points: 0,
      },
      {
        id: "q-ai1",
        question_text:
          "What is the definition of **Artificial Intelligence (AI)** mentioned in the video?",
        question_type: "single_choice",
        question_order: 2,
        options: {
          choices: [
            "A system that can only process data",
            "A machine's ability to imitate intelligent human behavior",
            "A complex database management system",
            "A program for creating simple websites",
          ],
        },
        correct_answer: "A machine's ability to imitate intelligent human behavior",
        explanation:
          "AI is defined as a machine's ability to imitate intelligent human behavior, such as learning and problem-solving.",
        points: 10,
      },
      {
        id: "q-ai2",
        question_text:
          "Which term refers to AI systems that can learn and adapt without being explicitly programmed?",
        question_type: "single_choice",
        question_order: 3,
        options: {
          choices: [
            "Big Data",
            "Cloud Computing",
            "Machine Learning (ML)",
            "Web Development",
          ],
        },
        correct_answer: "Machine Learning (ML)",
        explanation:
          "Machine Learning (ML) is an application of AI that gives systems the ability to automatically learn and improve from experience without being explicitly programmed.",
        points: 10,
      },
      {
        id: "q-ai3",
        question_text:
          "What distinguishes **Deep Learning** from general Machine Learning?",
        question_type: "single_choice",
        question_order: 4,
        options: {
          choices: [
            "It only uses text data.",
            "It uses a single layer of neurons.",
            "It uses complex Artificial Neural Networks (ANNs) with multiple layers.",
            "It is slower than traditional ML.",
          ],
        },
        correct_answer:
          "It uses complex Artificial Neural Networks (ANNs) with multiple layers.",
        explanation:
          "Deep Learning utilizes deep Artificial Neural Networks (ANNs) with multiple layers to process data and make decisions.",
        points: 10,
      },
      {
        id: "q-ai4",
        question_text: "What is **Natural Language Processing (NLP)** primarily concerned with?",
        question_type: "single_choice",
        question_order: 5,
        options: {
          choices: [
            "Image recognition",
            "Allowing computers to understand and process human language",
            "Training robots to move",
            "Creating complex financial models",
          ],
        },
        correct_answer:
          "Allowing computers to understand and process human language",
        explanation:
          "NLP is the field that gives computers the ability to understand, interpret, and process human languages, for applications like translation and sentiment analysis.",
        points: 10,
      },
      {
        id: "q-ai5",
        question_text:
          "What type of system is a **Chatbot** often based on, as discussed in the video?",
        question_type: "single_choice",
        question_order: 6,
        options: {
          choices: [
            "Computer Vision",
            "Reinforcement Learning",
            "Natural Language Processing (NLP)",
            "Data Warehousing",
          ],
        },
        correct_answer: "Natural Language Processing (NLP)",
        explanation:
          "Chatbots use NLP to understand user input and generate human-like responses.",
        points: 10,
      },
      {
        id: "q-ai6",
        question_text:
          "Which term describes the process where a computer system is given labeled data to learn from?",
        question_type: "single_choice",
        question_order: 7,
        options: {
          choices: [
            "Unsupervised Learning",
            "Supervised Learning",
            "Deep Learning",
            "Robotics",
          ],
        },
        correct_answer: "Supervised Learning",
        explanation:
          "Supervised Learning involves training a model on a labeled dataset, meaning the desired output is already known.",
        points: 10,
      },
      {
        id: "q-ai7",
        question_text:
          "When an AI system clusters unlabelled data to find hidden patterns, what type of learning is being used?",
        question_type: "single_choice",
        question_order: 8,
        options: {
          choices: [
            "Supervised Learning",
            "Reinforcement Learning",
            "Unsupervised Learning",
            "Data Tagging",
          ],
        },
        correct_answer: "Unsupervised Learning",
        explanation:
          "Unsupervised Learning is used to find hidden patterns or structures in unlabelled data, such as clustering customer data.",
        points: 10,
      },
      {
        id: "q-ai8",
        question_text:
          "What does **Reinforcement Learning** focus on in the AI training process?",
        question_type: "single_choice",
        question_order: 9,
        options: {
          choices: [
            "Learning through trial and error with a system of rewards and penalties.",
            "Only using pre-programmed rules.",
            "Analyzing static images.",
            "Processing vast amounts of text data only.",
          ],
        },
        correct_answer:
          "Learning through trial and error with a system of rewards and penalties.",
        explanation:
          "Reinforcement Learning trains an agent to make a sequence of decisions in an environment to maximize a cumulative reward, often seen in gaming AI.",
        points: 10,
      },
      {
        id: "q-ai9",
        question_text:
          "What is the primary role of **Computer Vision** in AI applications?",
        question_type: "single_choice",
        question_order: 10,
        options: {
          choices: [
            "Generating music",
            "Enabling computers to interpret and understand visual information from the world.",
            "Writing computer code",
            "Managing large databases",
          ],
        },
        correct_answer:
          "Enabling computers to interpret and understand visual information from the world.",
        explanation:
          "Computer Vision is the field of AI that enables computers to gain a high-level understanding from digital images or videos, such as recognizing objects or faces.",
        points: 10,
      },
      {
        id: "q-ai10",
        question_text:
          "Which of the following AI terms is often associated with the use of convolutional neural networks (CNNs) for tasks like image classification?",
        question_type: "single_choice",
        question_order: 11,
        options: {
          choices: [
            "Natural Language Processing (NLP)",
            "Reinforcement Learning",
            "Computer Vision",
            "Big Data",
          ],
        },
        correct_answer: "Computer Vision",
        explanation:
          "Convolutional Neural Networks (a type of Deep Learning) are fundamental to modern Computer Vision for tasks like image classification and object detection.",
        points: 10,
      },
    ],
  },
];

export default aiterms;