import { useState, useRef, useEffect, useCallback } from 'react'
import './Accordion.css'

function AccordionItem({ id, question, answer, isOpen, onToggle }) {
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  const panelId = `accordion-panel-${id}`
  const triggerId = `accordion-trigger-${id}`

  return (
    <div className={`accordion-item ${isOpen ? 'accordion-item--open' : ''}`}>
      <button
        id={triggerId}
        className="accordion-item__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="accordion-item__question">{question}</span>
        <svg
          className="accordion-item__chevron"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="accordion-item__panel"
        style={{ maxHeight: height }}
      >
        <div ref={contentRef} className="accordion-item__answer">
          {answer}
        </div>
      </div>
    </div>
  )
}

export default function Accordion({
  items = [],
  singleOpen = true,
  className = '',
}) {
  const [openIndex, setOpenIndex] = useState(-1)

  const handleToggle = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index))
  }, [])

  return (
    <div className={`accordion ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          id={index}
          question={item.question}
          answer={item.answer}
          isOpen={singleOpen ? openIndex === index : false}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
}
