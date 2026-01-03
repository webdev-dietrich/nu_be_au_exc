<script setup lang="ts">
const msg = reactive({
  subject: 'test',
  text: 'test mail',
  to: 'sascha_dietrich@outlook.com',
})

async function sendCustomMail() {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: msg.to,
        subject: msg.subject,
        text: msg.text,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Failed to send email:', error)
      alert('Fehler beim Senden der E-Mail. Bitte versuchen Sie es erneut.')
      return
    }

    const result = await response.json()
    console.info('Email sent successfully:', result)
    alert('E-Mail wurde erfolgreich gesendet!')
  }
  catch (error) {
    console.error('Error sending email:', error)
    alert('Ein unerwarteter Fehler ist aufgetreten.')
  }
}
</script>

<template>
  <div>
    <button
      disabled="true"
      @click.once="sendCustomMail"
    >
      Test
    </button>
  </div>
</template>
