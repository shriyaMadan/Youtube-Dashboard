# Necessary Keys for the Project To Run it Locally-
(After you have forked and cloned the repository)*

Just follow along ;)

## Creation of Youtube API KEY:

1. Follow [this link](https://console.developers.google.com/project) and click on CREATE PROJECT. Make sure you are logged in into your Google Developers Account.

2. Fill in the name you want to assign to your project.

3. On the top left corner, click the Google APIs link and then follow the link option dubbed “YouTube DATA API” below the YouTube API’s icon.

4. Now select the “ENABLE” button which manifests after you click the YouTube DATA API link.

5. Now click the button on the far right with the “Go to Credentials” phrase.

6. On the first select option displayed on this page, choose the YouTube Data API v3, and then the Web server (such as node js. Tomcat) on the second option. For the third option, choose public data. Lastly, click the button with “what credentials do I need”.

7. After hitting the “What credentials do I need” button, Google will create your new project, and you can now copy your API Key from this page.

Now you’re ready to use the YouTube API!

### Using Youtube API key to run this project:

1. Create a file named ".env".
2. Create a variable named "API_KEY".
3. Insert the key you generated in this variable.

<pre> API_KEY = 'Your API key here' </pre>

4. Don't forget to save the file.

---

### The next step is to generate file for Oauth credentials:


## Follow steps to download your credentials file:

1. Use [this wizard](https://console.developers.google.com/flows/enableapi?apiid=youtube) to create or select a project in the Google Developers Console and automatically turn on the API. Click Continue, then Go to credentials.

2. On the Add credentials to your project page, click the Cancel button.

3. At the top of the page, select the OAuth consent screen tab. Select an Email address, enter a Product name if not already set, and click the Save button.

4. Select the Credentials tab, click the Create credentials button and select OAuth client ID.

5. Select the application type Web Application, enter the name "YouTube Data API Quickstart", and click the Create button.

6. Set Authorized Javascript origins URI as: "http://localhost:5000" and Redirect URI as: "http://localhost:5000/auth/oauth2/callback" then click Save button.

7. Click OK to dismiss the resulting dialog.

8. Click the file_download (Download JSON) button to the right of the client ID.

9. Open the downloaded file and add it to your .env file as
<pre> OAUTH_CLIENT_KEYS = contents_of_your_downloaded_json </pre>


If you are having doubts then check [here](https://support.google.com/cloud/answer/6158849?hl=en) too!

Boom! You did it ✌
