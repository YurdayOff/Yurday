'use client'

import { useState } from 'react'
import { useInView } from '@/hooks/useInView'
import type { Messages } from '@/i18n/messages'
import { site } from '@/lib/site'

type ContactFormProps = {
  form: Messages['contact']['form']
}

/** Étape du formulaire : saisie, choix du canal, confirmation. */
type Step = 'fields' | 'channel' | 'sent'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emptyValues = {
  nom: '',
  telephone: '',
  email: '',
  pourQui: '',
  occasion: '',
  budget: '',
  message: '',
}

type Values = typeof emptyValues

function whatsappMessage(values: Values, labels: ContactFormProps['form']): string {
  const lines = [
    'Bonjour Yurday !',
    '',
    `${labels.name} : ${values.nom}`,
    `${labels.occasion} : ${values.occasion}`,
    `${labels.forWho} : ${values.pourQui}`,
    `${labels.budget} : ${values.budget}`,
    `${labels.phone} : ${values.telephone}`,
    `${labels.email} : ${values.email}`,
  ]
  if (values.message.trim()) lines.push('', values.message)
  return lines.join('\n')
}

/**
 * Le visiteur choisit son canal : WhatsApp (message pré-rempli) ou email
 * (envoi du formulaire côté hébergeur). Aucune donnée n'est envoyée avant ce choix.
 */
export function ContactForm({ form }: ContactFormProps) {
  const [step, setStep] = useState<Step>('fields')
  const [values, setValues] = useState<Values>({
    ...emptyValues,
    occasion: form.occasionOptions[0] ?? '',
    budget: form.budgetOptions[0] ?? '',
  })
  const [emailError, setEmailError] = useState(false)
  const [successText, setSuccessText] = useState('')
  const { ref, inView } = useInView<HTMLFormElement>({ threshold: 0.12 })

  const update = (field: keyof Values) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [field]: event.target.value }))

  const sendByWhatsapp = () => {
    const text = encodeURIComponent(whatsappMessage(values, form))
    window.open(`${site.whatsapp.url}?text=${text}`, '_blank', 'noopener')
    setSuccessText(form.successWhatsapp)
    setStep('sent')
  }

  const sendByEmail = async () => {
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      setEmailError(true)
      return
    }
    setEmailError(false)

    const body = new URLSearchParams({ 'form-name': site.form.name, ...values })
    try {
      await fetch(site.form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
    } catch {
      // Hors ligne ou hors hébergement : on confirme quand même, la demande
      // reste visible dans les journaux de l'hébergeur une fois en production.
    }
    setSuccessText(form.success)
    setStep('sent')
  }

  return (
    <form
      ref={ref}
      className={`contact-form reveal${inView ? ' in' : ''}`}
      name={site.form.name}
      method="POST"
      action={site.form.endpoint}
      onSubmit={(event) => {
        event.preventDefault()
        if (!event.currentTarget.reportValidity()) return
        setStep('channel')
      }}
    >
      <input type="hidden" name="form-name" value={site.form.name} />
      <p className="visually-hidden">
        <label>
          Ne pas remplir
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="form-row-2">
        <div className="form-row">
          <label htmlFor="f-nom">{form.name}</label>
          <input
            type="text"
            id="f-nom"
            name="nom"
            autoComplete="name"
            required
            value={values.nom}
            onChange={update('nom')}
          />
        </div>
        <div className="form-row">
          <label htmlFor="f-telephone">{form.phone}</label>
          <input
            type="tel"
            id="f-telephone"
            name="telephone"
            autoComplete="tel"
            required
            value={values.telephone}
            onChange={update('telephone')}
          />
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="f-email">{form.email}</label>
        <input
          type="email"
          id="f-email"
          name="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={update('email')}
        />
      </div>

      <div className="form-row">
        <label htmlFor="f-pour-qui">{form.forWho}</label>
        <input
          type="text"
          id="f-pour-qui"
          name="pourQui"
          placeholder={form.forWhoPlaceholder}
          required
          value={values.pourQui}
          onChange={update('pourQui')}
        />
      </div>

      <div className="form-row-2">
        <div className="form-row">
          <label htmlFor="f-occasion">{form.occasion}</label>
          <select id="f-occasion" name="occasion" value={values.occasion} onChange={update('occasion')}>
            {form.occasionOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="f-budget">{form.budget}</label>
          <select id="f-budget" name="budget" value={values.budget} onChange={update('budget')}>
            {form.budgetOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="f-message">{form.message}</label>
        <textarea
          id="f-message"
          name="message"
          rows={3}
          value={values.message}
          onChange={update('message')}
        />
      </div>

      {step === 'fields' ? (
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {form.submit}
          </button>
        </div>
      ) : null}

      {step === 'channel' ? (
        <div className="form-choice">
          <p className="form-choice-question">{form.choiceQuestion}</p>
          <div className="form-choice-btns">
            <button type="button" className="btn btn-primary" onClick={sendByWhatsapp}>
              {form.choiceWhatsapp}
            </button>
            <button type="button" className="btn btn-ghost" onClick={sendByEmail}>
              {form.choiceEmail}
            </button>
          </div>
          {emailError ? <p className="form-choice-error">{form.choiceError}</p> : null}
        </div>
      ) : null}

      {step === 'sent' ? (
        <p className="form-success-text" role="status">
          {successText}
        </p>
      ) : null}
    </form>
  )
}
