# Waqq.ly
A cloud-based Web App that helps dog owners identify dog walkers in their area. (A submission for the module BS3928 - Cloud Computing and Infrastructure at The University of Winchester)


Waqq.ly Static Web App URL:
https://agreeable-pebble-031a20b03.5.azurestaticapps.net

GitHub Repository Link:
https://github.com/Hugh5218/Waqq.ly.git


So that the code and Waqq.ly web application can be properly marked, please follow the instructions below to deploy the working prototype if needs be.


Requirements:
Visual Studio Code
Azure Account
Node.js (version 14)
Azure VSCode Extension
Azure Functions Core Tools (version 3)
Azure Cosmos DB Account


Frontend Deployment:
1. Clone the GitHub repository to your local machine from the link provided above or in the report.

2. Create a new static web app in Azure and under deployment details select "Other" for "Source" and "GitHub" for "Repository".

3. Authorise Azure to connect with your GitHub account and then select the repository and branch.

4. Follow the provided URL in the static web app overview to see the frontend.


Backend Deployment:
1. While in Visual Studio Code, install the Azure extension and Azure Functions Core Tools.

2. On Azure, create a new function app, add it to the same resource group as the static web app, and set the runtime stack to Node.js.

3. In the setting setting of the function app make sure you add the two environmental variables. The first is 'COSMOS_DB_ENDPOINT' and then add the Cosmos DB endpoint URL. The next is 'COSMOS_DB_KEY' and then add the Cosmos DB primary key.

4. Add the static web app URL to the CORS setting in the function app.

5. Log in to the Azure extension in VSCode, find the created function app and deploy the 'backend' folder to it.


The full Waqq.ly application should then be deployed and functional on the static web app URL.