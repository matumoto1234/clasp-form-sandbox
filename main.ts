const properties = PropertiesService.getScriptProperties().getProperties();
const WEBHOOK_URL = properties.WEBHOOK_URL;


type DataType = string | string[] | string[][];

const dataToString = (s: DataType): string => {
  switch (typeof s) {
    case 'string':
      return s;
    case 'object':
      switch (typeof s[0]) {
        case 'string':
          return s.join('\n');
        case 'object':
          // 二次元配列を一次元にしてそれを'\n'区切りのstringに
          return [].concat(s).join('\n');
        default:
          return '';
      }
    default:
      return '';
  }
}

const escapeBackquotes = (s: string): string => {
  let result = '';
  for (const char of s) {
    if (char === '`') {
      result = result + '\\`';
      continue;
    }
    result = result + char;
  }
  return result;
};

const onSubmit = (e: any) => {
  const response: GoogleAppsScript.Forms.FormResponse = e.response;
  const itemResponses: GoogleAppsScript.Forms.ItemResponse[] = response.getItemResponses();

  let dataList: DataType[] = [];

  for (const itemResponse of itemResponses) {
    const title: string = itemResponse.getItem().getTitle();
    const helpText: string = itemResponse.getItem().getHelpText();
    const res: DataType = itemResponse.getResponse();

    let data = `\`\`\`【${title}】\n`;
    if (helpText !== '') {
      data = data + `${helpText}\n`;
    }
    const strRes = dataToString(res);
    const escaped = escapeBackquotes(strRes);
    data = data + `${escaped}\n\`\`\``;

    dataList.push(data)
  }

  const body: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      content: dataList.join('\n')
    })
  }

  UrlFetchApp.fetch(WEBHOOK_URL, body)
}
