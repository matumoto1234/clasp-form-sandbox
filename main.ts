const properties = PropertiesService.getScriptProperties().getProperties();
const WEBHOOK_URL = properties.WEBHOOK_URL;

const onSubmit = (e: any) => {
  const data = (e.response as GoogleAppsScript.Forms.FormResponse)
    .getItemResponses()[0]
    ?.getResponse()

  const body: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      content: data
    })
  }

  UrlFetchApp.fetch(WEBHOOK_URL, body)
}
