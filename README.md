Pagify Client for Node.js
=========

Pagify is a web-based document design and generation service, that integrates nicely with your existing web applications and SaaS products. 

For further information on uses of Pagify, please visit http://pagify.io

This client library helps you to integrate Pagify with your Node.JS applications with minimum coding effort. Before using this library please ensure that you have a valid Pagify service account, and have noted down your API key and secret. Install the package using: 
```javascript
npm install pagify
```

Using this library you can;
- List existing document templates
- Create a new document template
- Delete a document template
- Generate link to edit a document template
- Generate PDF

Before calling any action or function make sure to initialize the client using your api secret and api key:

```javascript
var pagify = require('pagify');

pagify.init('<api-key>','<api-secret>');
```
Once initailized the ```pagify``` object can be used to perform all the above listed actions. A callback is required in each request which is called with response data on completeion of request.

1. List templates:
------------------
A list of all templates that have either been created using Pagify dashboard or through the public API can be retrieved through ```listTemplates``` call.

```javascript
pagify.listTemplates(function(data) {
  templates = data;
});
```
Here is a sample response for a successful call:
```javascript
{
  "statusCode": 200, 
  "message": "Here is the list of the templates.", 
  "templateIds": {
    "71d620fc773a11e288cce006e61619ba": "First Template",
    "89afs89fff88s8s8f8cce006e61619ba": "Second Template"
  }
}
```
The response contains a hash with template ids as keys and template names as values.
>Note that the template id is unique whereas template name is not.

2. Create template:
-------------------
Create a blank templates using ```createTemplate``` function call.

```javascript
pagify.createTemplate(function(data) {
  template = data;
});
```
Here is a sample successful response:
```javascript
{
  "statusCode": 200, 
  "message": "Here is the template id of the new template.", 
  "templateId": "71d620fc773a11e288cce006e61619ba"
}
```
The response contains the template id for the new template. 
>Note that this template is not ready to generate PDF as long as you don't edit and save it for the first time.

3. Delete template:
-------------------
To delete a template use ```deleteTemplate``` function call.
```javascript
pagify.deleteTemplate(<template_id_as_string>, function(data) {
  template = data;
});
```
For example if the template id is ``` "71d620fc773a11e288cce006e61619ba" ```
```javascript
pagify.deleteTemplate("71d620fc773a11e288cce006e61619ba", function(data) {
  response = data;
});
```
On a successful call you should get following response:
```javascript
{
  "statusCode": 200, 
  "message": "Succesfully deleted the template."
}
```

4. Edit template:
-----------------
The API allows to generate a link to edit a specified template, without user actually logging in to Pagify service. The user must visit the link with 30 minutes time, otherwise the link will expire. Once the user visits the link the session validity increases upto 1 day. After that the developer must request a new link to edit the template. You can generate the link by calling ```editTemplate``` function
```javascript
pagify.editTemplate(<template_id_as_string>, function(data) {
  template = data;
});
```
For example
```javascript
pagify.editTemplate("71d620fc773a11e288cce006e61619ba", function(data){
  template = data;
});
```
If the template is valid a typical successful response will be as follows:
```javascript
{
  "statusCode": 200, 
  "url": "http://pagify.io/templates/71d620fc773a11e288cce006e61619ba/edit?template_session=89afs89fff88s8s8f8cce006e61619ba"
}
```
5. Generate PDF:
----------------
To generate a PDF use ```generatePDF``` function call. The function call requires a valid template id and data.
```javascript
pagify.generatePDF(<template_id_as_string>, <data_as_hash>, function(data) {
  template = data;
});
```
For example
```javascript
data = {
          "text_field": "Hello World!",
          "image_field": "http://abc.com/xyz.png",
          "chart_multi_value_field": [
                          ["First", "Second", "Third"],
                          [20, 40, 30],
                          [50, 60, 10]
                       ],
          "chart_single_value_field": [20, 30, 40],
          "chart_xy_field": [
                          [{"x": 20, "y": 40}, {"x": 10, "y": 30}, {"x": 70, "y": 50}],
                          [{"x": 10, "y": 30}, {"x": 20, "y": 30}, {"x": 80, "y": 30}],
                       ]
        }
pagify.generatePDF("71d620fc773a11e288cce006e61619ba", data,  function(da) {
  template = da;
});

Note: A successful response is of binary type, where as a failed response will be a hash containing error message and status code.
```
If the function call is successful the response is in binary format which can be saved as a PDF using ```File``` class.

The data supplied to populate the template is a hash containing field names and values. Field name refers to the placeholder(text, image, chart, table) which can be set in the editor. Valid values of each field type are as follows:

<b>Text:</b> Any valid string.<br/>
<b>Image:</b> Url of any image with public access.<br/>
<b>Table:</b> A matrix of string values supplied as a nested array.<br/>
<b>Chart:</b> There are three categories of charts that are currently available. Each chart type requires a different format for values:<br/>
<b>Multi-value series chart(bar, stacked, line, area): </b>
A matrix of positive integer values supplied as nested array.
```javascript
{
  "chart_multi_value_field": [
                                ["First", "Second", "Third"],
                                [20, 40, 30],
                                [50, 60, 10]
                             ]
}
```
<b>Singe-value series chart(pie, doughnut): </b>
An array of positive integer values.
```javascript
{"chart_single_value_field": [20, 30, 40]}
```
<b>XY chart(point): </b>
A matrix of hashes supplied as nested array. Each hash is a pair of x, y values
```javascript
{
  "chart_xy_field": [
                        [{"x": 20, "y": 40}, {"x": 10, "y": 30}, {"x": 70, "y": 50}],
                        [{"x": 10, "y": 30}, {"x": 20, "y": 30}, {"x": 80, "y": 30}],
                    ]
}
```

That's all. 

Please mail at support@pagify.io if you need any further help. We always love hearing from our customers.
