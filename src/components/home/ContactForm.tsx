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
 * Le visiteur choisit son canal : WhatsApp (message pré-rempli) ou email.
 * Aucune donnée n'est envoyée avant ce choix.
 *
 * Le canal email passe par Netlify Forms : le formulaire porte les attributs de
 * détection (`data-netlify`, `netlify-honeypot`) et poste vers `public/__forms.html`,
 * la copie statique que Netlify analyse au déploiement — le HTML produit par Next
 * n'étant pas déposé sous forme de fichiers `.html` dans le dossier publié.
 * Les réponses arrivent dans l'onglet « Forms » du tableau de bord Netlify.
 */
export function ContactForm({ form }: ContactFormProps) {
  const [step, setStep] = useState<Step>('fields')
  const [values, setValues] = useState<Values>({
    ...emptyValues,
    occasion: form.occasionOptions[0] ?? '',
    budget: form.budgetOptions[0] ?? '',
  })
  const [emailError, setEmailError] = useState(false)
  const [sendFailed, setSendFailed] = useState(false)
  const [sending, setSending] = useState(false)
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
    setSendFailed(false)
    setSending(true)

    // Netlify attend les champs du formulaire encodés comme un envoi HTML classique,
    // accompagnés du nom du formulaire.
    const body = new URLSearchParams({ 'form-name': site.form.name, ...values })
    try {
      const response = await fetch(site.form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) throw new Error(`Envoi refusé (${response.status})`)
    } catch {
      // Échec réseau ou formulaire non détecté : on le dit, et on laisse
      // WhatsApp et l'email direct à portée de clic.
      setSendFailed(true)
      setSending(false)
      return
    }

    setSending(false)
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
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={(event) => {
        event.preventDefault()
        if (!event.currentTarget.reportValidity()) return
        setStep('channel')
      }}
    >
      <input type="hidden" name="form-name" value={site.form.name} />
      {/* Appât anti-robot : un envoi qui remplit ce champ est écarté par Netlify. */}
      <p className="visually-hidden" aria-hidden="true">
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
            <button
              type="button"
              className="btn btn-ghost"
              onClick={sendByEmail}
              disabled={sending}
            >
              {form.choiceEmail}
            </button>
          </div>
          {emailError ? <p className="form-choice-error">{form.choiceError}</p> : null}
          {sendFailed ? (
            <p className="form-choice-error" role="alert">
              {form.sendError}{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          ) : null}
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
