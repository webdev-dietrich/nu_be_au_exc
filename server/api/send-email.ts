export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body || !body.to || !body.subject || (!body.text && !body.html)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid request: Missing required fields (to, subject, text/html)',
      })
    }
    const { sendMail } = useNodeMailer()

    interface EmailBody {
      to: string
      subject: string
      text?: string
      html?: string
    }

    const bodyContent = (body: EmailBody) => {
      if (body.text) {
        return { text: body.text }
      }
      else {
        return { html: body.html }
      }
    }

    const result = await sendMail({
      to: body.to,
      subject: body.subject,
      ...bodyContent(body),
    })

    console.info('Email sent successfully!', result)

    return {
      success: true,
      messageId: result.messageId,
      message: 'Email sent successfully',
    }
  }
  catch (error) {
    console.error('=== EMAIL ERROR ===', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to send email',
      data: error,
    })
  }
})
