# The Next Gen eBay

Hi there! In this simple (hopefully interesting) task you'll creating an auction site. That's right, a full, functional, production ready auction site that will be able to compete with any of the current giants, like eBay. 

The way it will work is the following.

The landing page will showcase the auctioned product, the current max-bid for it, and the username of the person who currently holds the max-bid. Users will be able to open the site, and place their bid to win the auction, which should always outbid the curent max-bid, of course.

Here's the fun part:

The site should do live-time updates once a new bid has been submitted. That means, if user "john.doe" holds the current max-bid with $50, and then "kath.mk" places a bid of $60, "john.doe" should automatically get a notification in the browser/website to inform him that he was outbidded, and should bet again in case he wants to win the product. Of course, the current max-bid/max-bid holder should update automatically on the website for all the users with the site opened.

For security reasons, you should **never** show the last three characters of the current max-bidder. That is, for example, if the user "johndoe" currently holds the max bid with $50, it will be shown as ($50 - john***) on the website.

As we want to make the most money possible, we won't have a countdown for the auctions. That means it'll run forever until people decide they don't want to bet anymore.

# Bonus Points

- Showing your design/ui/ux skills
- Showing your git skills
- Handling multiple products at the same time, and applying the above logically to each of them (i.e., users can bet on multiple products, and each one will have a current max-bid/max-bid holder independent from each other).
