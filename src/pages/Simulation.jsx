import React, { useState } from 'react';

export default function Simulation() {
  // State for different simulation aspects
  const [selectedStyle, setSelectedStyle] = useState('persuasive');
  const [argumentText, setArgumentText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [witnessResponses, setWitnessResponses] = useState([]);
  const [timelineOutcomes, setTimelineOutcomes] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [activeTab, setActiveTab] = useState('arguments');

  // Sample data for different argument styles
  const argumentStyles = [
    { id: 'persuasive', name: 'Persuasive', description: 'Appeal to logic and emotion with balanced rhetoric' },
    { id: 'calm', name: 'Calm & Measured', description: 'Fact-based, methodical approach with neutral tone' },
    { id: 'aggressive', name: 'Aggressive', description: 'Confrontational style with strong challenges' },
    { id: 'narrative', name: 'Narrative', description: 'Storytelling approach to frame your case' }
  ];

  // Sample witness responses
  const witnessResponseLibrary = {
    'persuasive': [
      "I understand your perspective, but consider the broader implications...",
      "That's a reasonable point, however the evidence suggests otherwise...",
      "I appreciate that viewpoint, but let me offer an alternative interpretation..."
    ],
    'calm': [
      "Based on the records, I can confirm that on June 15th...",
      "The documentation shows a different sequence of events...",
      "I need to clarify that my previous statement was specifically about..."
    ],
    'aggressive': [
      "I strongly disagree with that characterization of events!",
      "That's an inaccurate representation of what occurred!",
      "I must object to that line of questioning as misleading!"
    ],
    'evasive': [
      "I don't recall that specific detail...",
      "I would need to review the documents before answering...",
      "That question seems to presume facts not in evidence..."
    ]
  };

  // Sample feedback criteria
  const feedbackCriteria = [
    { name: 'Persuasiveness', score: 0 },
    { name: 'Legal Accuracy', score: 0 },
    { name: 'Clarity', score: 0 },
    { name: 'Professionalism', score: 0 },
    { name: 'Effectiveness', score: 0 }
  ];

  // Function to generate a mock argument based on selected style
  const generateArgument = () => {
    const style = argumentStyles.find(s => s.id === selectedStyle);
    let generatedArgument = '';
    
    switch(selectedStyle) {
      case 'persuasive':
        generatedArgument = "Your Honor, if we consider the fundamental principles of justice in this matter, we find that the evidence clearly demonstrates a pattern of behavior that any reasonable person would find concerning. The defendant's actions not only violated the statute but also breached the trust placed in them by the community.";
        break;
      case 'calm':
        generatedArgument = "The record shows three specific instances where the protocol was not followed. On June 15th, the log indicates an entry was modified after the fact. On July 22nd, the required verification step was skipped. Finally, on August 5th, the documentation was incomplete according to regulation 4.2.C.";
        break;
      case 'aggressive':
        generatedArgument = "This is nothing but a blatant attempt to mislead the court! The evidence clearly shows the defendant knowingly and willingly violated the agreement. Their actions demonstrate a complete disregard for the process and for the truth!";
        break;
      case 'narrative':
        generatedArgument = "Imagine a small business owner, working tirelessly for decades to build something for their family. Now picture that foundation being undermined by the deceptive practices we've seen in this case. This isn't just about financial loss—it's about broken trust and damaged reputations.";
        break;
      default:
        generatedArgument = "Please select an argument style to generate content.";
    }
    
    setArgumentText(generatedArgument);
  };

  // Function to ask a question to the AI witness
  const askQuestion = () => {
    if (!currentQuestion.trim()) return;
    
    // Determine response style based on some logic (could be random or based on question content)
    const responseStyles = Object.keys(witnessResponseLibrary);
    const randomStyle = responseStyles[Math.floor(Math.random() * responseStyles.length)];
    const possibleResponses = witnessResponseLibrary[randomStyle];
    const response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    
    const newQuestion = {
      id: questions.length + 1,
      text: currentQuestion,
      response: response,
      style: randomStyle
    };
    
    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
  };

  // Function to simulate different timeline outcomes
  const simulateTimelines = () => {
    const outcomes = [
      {
        title: "Standard Procedure Timeline",
        steps: [
          "Motion to dismiss - Denied",
          "Discovery phase - Completed",
          "Pre-trial conference - Scheduled",
          "Trial - Estimated 3-5 days",
          "Verdict - Jury deliberation 1-2 days"
        ],
        successProbability: "65%"
      },
      {
        title: "Expedited Timeline",
        steps: [
          "Motion to dismiss - Granted in part",
          "Limited discovery - 30 days",
          "Summary judgment motion - Filed",
          "Settlement conference - Ordered",
          "Possible resolution in 60 days"
        ],
        successProbability: "45%"
      },
      {
        title: "Appeal Scenario",
        steps: [
          "Initial verdict - Unfavorable",
          "Notice of appeal - Filed",
          "Appellate briefing - 90 days",
          "Oral arguments - Scheduled",
          "Appellate decision - 6-12 months"
        ],
        successProbability: "30%"
      }
    ];
    
    setTimelineOutcomes(outcomes);
  };

  // Function to get AI feedback
  const getFeedback = () => {
    // Generate random scores for demonstration
    const scoredFeedback = feedbackCriteria.map(criterion => ({
      ...criterion,
      score: Math.floor(Math.random() * 40) + 60 // Random score between 60-100
    }));
    
    const overallScore = scoredFeedback.reduce((sum, item) => sum + item.score, 0) / scoredFeedback.length;
    
    const comments = [
      "Your persuasive approach was effective but could use more specific case references.",
      "Consider varying your tone more to emphasize key points.",
      "The narrative structure was compelling but watch for tangential details.",
      "Your cross-examination strategy effectively highlighted inconsistencies.",
      "Work on transitioning more smoothly between evidence points."
    ];
    
    setFeedback({
      criteria: scoredFeedback,
      overallScore: overallScore.toFixed(1),
      comments: comments
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🏛️ Courtroom Simulation</h2>
        <p className="text-gray-600 mb-6">Practice arguments, cross-examination, and explore different case outcomes</p>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'arguments' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('arguments')}
          >
            Argument Simulation
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'cross-exam' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('cross-exam')}
          >
            Cross-Examination
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'timelines' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('timelines')}
          >
            Timeline Outcomes
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'feedback' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('feedback')}
          >
            AI Feedback
          </button>
        </div>
        
        {/* Argument Simulation Tab */}
        {activeTab === 'arguments' && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Mock Argument Generation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {argumentStyles.map(style => (
                <div 
                  key={style.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedStyle === style.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <h4 className="font-medium text-gray-800">{style.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mb-4">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={generateArgument}
              >
                Generate Argument
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[150px]">
              <p className="text-gray-800">{argumentText || "Your generated argument will appear here..."}</p>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Save Argument
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Practice Delivery
              </button>
            </div>
          </div>
        )}
        
        {/* Cross-Examination Tab */}
        {activeTab === 'cross-exam' && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Witness Cross-Examination</h3>
            
            <div className="flex mb-6">
              <input
                type="text"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder="Type your question for the witness..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
              />
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                onClick={askQuestion}
              >
                Ask Question
              </button>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {questions.length > 0 ? (
                questions.map((q) => (
                  <div key={q.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <span className="material-icons text-blue-600">person</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">You: {q.text}</p>
                        <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                          <div className="flex items-center mb-2">
                            <div className="bg-red-100 p-1 rounded-full mr-2">
                              <span className="material-icons text-red-600 text-sm">smart_toy</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">AI Witness ({q.style}):</span>
                          </div>
                          <p className="text-gray-800">{q.response}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <span className="material-icons text-4xl mb-2">question_answer</span>
                  <p>No questions asked yet. Start by asking a question to the AI witness.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Timeline Outcomes Tab */}
        {activeTab === 'timelines' && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Parallel Timeline Outcomes</h3>
            
            <div className="mb-6">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={simulateTimelines}
              >
                Generate Timeline Scenarios
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {timelineOutcomes.length > 0 ? (
                timelineOutcomes.map((timeline, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3">{timeline.title}</h4>
                    <div className="mb-4">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        Success Probability: {timeline.successProbability}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {timeline.steps.map((step, i) => (
                        <li key={i} className="flex items-start">
                          <span className="material-icons text-green-500 mr-2 text-sm">check_circle</span>
                          <span className="text-gray-700 text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  <span className="material-icons text-4xl mb-2">timeline</span>
                  <p>No timeline scenarios generated yet. Click the button to explore different outcomes.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* AI Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Jury/Bench Feedback</h3>
            
            <div className="mb-6">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={getFeedback}
              >
                Request Feedback
              </button>
            </div>
            
            {feedback ? (
              <div>
                <div className="flex items-center justify-center mb-8">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200 stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      />
                      <circle
                        className="text-blue-500 stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * feedback.overallScore) / 100}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-800">{feedback.overallScore}/100</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {feedback.criteria.map((criterion, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">{criterion.name}</h4>
                        <span className="font-bold text-gray-800">{criterion.score}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${criterion.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-800 mb-4">Feedback Comments</h4>
                  <ul className="space-y-3">
                    {feedback.comments.map((comment, index) => (
                      <li key={index} className="flex items-start">
                        <span className="material-icons text-blue-500 mr-2 text-sm">feedback</span>
                        <span className="text-gray-700">{comment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <span className="material-icons text-4xl mb-2">psychology</span>
                <p>No feedback yet. Click the button to get AI evaluation of your performance.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}