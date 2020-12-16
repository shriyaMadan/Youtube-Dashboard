# Youtube-Dashboard

This dashboard displays basic information about the channel. The information includes number of subscribers, total views, total videos. You can either search by Channel-name OR by Channel-URL.

PS: The application is under development, it will soon include more features and interesting information.

#### To run this project you will need to generate your own Youtube API KEY.

### Creation of Youtube API KEY:

1. Follow this link https://console.developers.google.com/project and click on CREATE PROJECT. Make sure you are logged in into your Google Developers Account.

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

This project is deployed in *Heroku*.

---

## Future Scope of this Project:
* Creating option of sign up in Youtube Account
* Viewing statistics of our own history
* Adding feature of a graphical representation of any channel's monthly/weekly views

#### Kindly refer to future scopes for contribution

---

Feel free to contribute :smile:
