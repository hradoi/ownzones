Using starter kit at 
https://developer.okta.com/blog/2018/11/15/node-express-typescript


We need to build an image delivery Microservice. The service will have a set of image files, stored in alocal folder (you can pick random images from the internet to seed it). It will receive HTTP calls for those
images on a particular endpoint (like /image/img_012343.jpg) 

and will support requests for various resolutions of those images. 

For instance, /image/img_012343.jpg?size=300x400 will resize the original
image at 300x400 and return it to the client. 

Additional info, specs & requirements:
• The project must be developed in TypeScript.
• We do not know in advance the resolutions that the clients will ask for.
• Other source images can be added in the folder at any time while the service is running.

• Include automated tests to cover the functionality.
• Design for performance and reliability and assume a high load on the service.
• Use the best practices and think about all the concerns of running this code in production but keep in mind that the ultimate goal is to come up with a working product (http://lifehacker.com/5870379/done-is-
better-than-perfect).
• Provide documentation and samples for calling the service and running the tests and the code.
• The project can be delivered either as a Github repository with read access or a ZIP archive with all the source files.
• Provide an additional endpoint to expose stats about the service, like:
    • The number of original files.
    • The number of resized files.
    • Cache hits/misses.
Bonus:
    • Avoid resizing images that were previously resized to the same resolution (cache).
    • Include a Dockerfile for running the service inside a container
    • Other stats that you think would be useful in monitoring and making sure the service is running smoothly.