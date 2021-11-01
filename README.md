# Code challenge for eVisit
By Carlos Molina Avendano

## Quickstart
In order to run this project you will need a computer with:
- NodeJS >= 15.9.0
- npm >= 7.11.2
- Git >= 2.30.1

1. Checkout this project
`git clone git@github.com:cmolina/evisit-code-challenge.git; cd evisit-code-challenge`
1. Install the dependencies
`npm i`
1. Run the tests
`npm test`

The source code is located in [src/index.ts](src/index.ts), while their unit tests are in [test/index.spec.ts](test/index.spec.ts).

## Q&A about this implementation
1. How does your code work?
    - The code uses both a dictionary and a list; the former to keep track of the IP addresses and their request count, and the later with the 100 most popular IP addresses. Both data structures must be updated every time a new request is handled.
1. What is the runtime complexity of each function?
    - Both `top100` and `clear` are `O(1)`.
    - On the other hand, `requestHandled` is `O(N log N)`, where `N` is 100. As `N` is a constant we can technically say `requestHandled` is `O(1)` but that may be misleading as this is the function actually generating the top 100 IP addresses list.
1. What would you do differently if you had more time?
    - I would move the array operations to its own thread with messages. This would reduce the `requestHandled` runtime complexity to `O(N)`,
    - I would change the way elements are added to the array: instead of pushing and sorting, I would insert the new element in the right position. This would reduce the runtime complexity from `O(N log N)` to `O(N)`.
1. What other approaches did you decide not to pursue?
    - I was wondering if I could use a heap to keep the most popular IP addresses, but then I realize there is no easy way to _update_ a node
    - I originally implemented the list to store a pair of `[IP address, requests]`, however I didn't like the fact I was duplicating the requests in both the dictionary and the list; so I refactor to only store IP addresses. Nevertheless, that first implementation was slightly better performant in the unit tests
1. How would you test this?
    - Unit tests; and then integration tests when integrated to its web service
