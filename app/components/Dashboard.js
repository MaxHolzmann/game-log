import Image from 'next/image'
//FINISH QUESTIONS

const faqs = [
  [
    {
      question: 'Do you take song requests?',
      answer:
        'Yes we do! However, we do have to find an arrangement and learn the arrangement before we can perform it, so we ask that any song requests are given 2-3 months in advance of your event.',
    },
    {
      question: 'How much do you charge?',
      answer:
        'We have no set price, many factors go into determining the price, such as travel, length of performance, or any song requests. Some events we even do for free! Contact us with your situation for specifics.',
    },
  ],
  [
    {
      question: 'Our event is tomorrow.. can we hire you to sing?',
      answer:
        'We can not make any promises, but if you have no special song requests, we might be able to make it work! Feel free to contact us and we will always do our best to make it work, even on short notice. ',
    },
    {
      question: 'Do you need any equipment provided?',
      answer:
        'Most of the time, no! If we are performing in a very large venue, we may need one microphone, but 99% of the time we just need ourselves!',
    },
  ],
  
]

export function Dash() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Question not answered?{' '}
            <a className="text-blue-600" href="/contact">
              Contact us!
            </a>{' '}
            We can personally answer any specific question you may have.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
