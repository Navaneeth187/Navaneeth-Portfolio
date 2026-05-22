import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const knowledgeBase = {
  'skills': 'Navaneeth specializes in Python, FastAPI, n8n workflow automation, Generative AI (Gemini API), NLP, TF-IDF, PostgreSQL, and React. He has production experience building ETL data pipelines and LLM-powered agents.',
  'experience': 'Navaneeth completed an AI & Data Analysis Internship at Upstride (Mar–May 2026), where he engineered automated ETL pipelines using Pandas and SQL for the Apex CRM ecosystem. He also holds leadership roles at NSS and E-Cell at NIT Durgapur.',
  'projects': 'Key projects include: (1) Lumina — an AI wellness companion that won 2nd Place at the IEEE GenAI Hackathon, (2) Smart College Complaint System — an n8n + Gemini Vision workflow automation, (3) PathAI — a FastAPI + TF-IDF resume analysis platform built at IISc Bangalore, and (4) Excel AI — a production data pipeline built during his Upstride internship.',
  'education': 'Currently pursuing B.Tech in Mechanical Engineering at NIT Durgapur (2024–2028) with a CGPA of 7.3. His core focus is heavily augmented with self-directed Computer Science and AI/ML coursework.',
  'achievements': '2nd Place at IEEE GenAI Hackathon (NIT Durgapur, 2026). Participated in ArtPark CodeForge Hackathon at IISc Bangalore. Content & Technical Writer at NSS. Creative Designer at E-Cell.',
  'contact': 'Email: navaneethp1407@gmail.com | Phone: +91 7075063050 | Location: NIT Durgapur, West Bengal. He is actively seeking AI Engineering, Backend Development, and Automation roles.',
  'architecture': 'Navaneeth thinks in terms of system design: decoupled frontends, async FastAPI backends, event-driven n8n workflows, and robust ETL pipelines. He prioritizes scalability, error handling, and clean API contracts.',
  'hire': 'You should hire Navaneeth because he combines strong AI/ML fundamentals with production backend engineering. He has shipped real systems under pressure (48-hour hackathons), has corporate internship experience (Upstride), and demonstrates deep systems thinking in every project case study.',
  'default': 'I can answer questions about Navaneeth\'s skills, experience, projects, education, achievements, architecture philosophy, and why you should hire him. Try asking: "What are his skills?" or "Tell me about his projects."'
};

const findAnswer = (query) => {
  const q = query.toLowerCase();
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('tools')) return knowledgeBase.skills;
  if (q.includes('experience') || q.includes('intern') || q.includes('work') || q.includes('upstride')) return knowledgeBase.experience;
  if (q.includes('project') || q.includes('lumina') || q.includes('pathai') || q.includes('complaint') || q.includes('excel')) return knowledgeBase.projects;
  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('nit')) return knowledgeBase.education;
  if (q.includes('achievement') || q.includes('hackathon') || q.includes('award') || q.includes('ieee')) return knowledgeBase.achievements;
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach')) return knowledgeBase.contact;
  if (q.includes('architecture') || q.includes('system') || q.includes('design') || q.includes('backend')) return knowledgeBase.architecture;
  if (q.includes('hire') || q.includes('why') || q.includes('strength') || q.includes('good')) return knowledgeBase.hire;
  return knowledgeBase.default;
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m Navaneeth\'s AI portfolio assistant. Ask me about his skills, projects, experience, or why you should hire him.' }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsStreaming(true);

    const fullAnswer = findAnswer(userMessage);
    
    // Simulate streaming effect
    let streamed = '';
    const words = fullAnswer.split(' ');
    
    setMessages(prev => [...prev, { role: 'assistant', content: '', streaming: true }]);

    for (let i = 0; i < words.length; i++) {
      streamed += (i === 0 ? '' : ' ') + words[i];
      const current = streamed;
      await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 40));
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: current, streaming: i < words.length - 1 };
        return updated;
      });
    }
    
    setIsStreaming(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-background rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(168,255,53,0.4)] hover:shadow-[0_0_35px_rgba(168,255,53,0.6)] transition-shadow focus:outline-none focus:ring-4 focus:ring-primary/40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] bg-background border border-cardBorder rounded-2xl shadow-[0_15px_50px_-12px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-cardBg border-b border-cardBorder px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-textMain">Portfolio Assistant</h3>
                <p className="text-xs text-textDarker font-mono">RAG-powered • Grounded on resume</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={14} className="text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[85%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-background font-medium rounded-br-md'
                      : 'bg-cardBg border border-cardBorder text-textMuted rounded-bl-md'
                  }`}>
                    {msg.content}
                    {msg.streaming && <span className="inline-block w-1.5 h-4 bg-primary ml-1 animate-pulse rounded-sm"></span>}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-cardBg border border-cardBorder flex items-center justify-center shrink-0 mt-1">
                      <User size={14} className="text-textMuted" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-cardBorder bg-cardBg flex gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isStreaming}
                placeholder="Ask about skills, projects..."
                className="flex-1 bg-background border border-cardBorder rounded-lg px-3 py-2.5 text-sm text-textMain placeholder:text-textDarker focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                aria-label="Chat message input"
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-background hover:bg-secondary transition-colors disabled:opacity-40 shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
