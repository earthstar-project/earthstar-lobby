# Lessons learned

- earthstar-graphql should not return deleted documents by default (changes made).
- It is nice to track when the user has changes that have not yet been synced with any pubs (especially when those changes will be lost when they close the window...)
- It is really nice to be able to make a dozen posts and edit / delete them before publishing them.
- There are cases when it would be handy for the earthstar package to export validation utilities. Currently using private methods on `ValidatorES4`.
- Man I need to learn about IndexedDB to contribute to a IndexedDBStorage
- Workspaces and pubs:
  - I previously removed the ability for workspaces to be created during sync with earthstar-graphql, but I think I might re-add it, especially now that there is a `canAddWorkspace` config.
  - I will need to find a way to determine whether a pub is a REST pub or a GraphQL pub, and build that into the syncWithPub mutation — adds too much overhead to find out beforehand.
- I have found a fun new pattern for contextual tooltip-esque UIs that I will probably keep reusing (see ContextualPanel.tsx)
- I had a feeling I'd need to do this before, but I am probably going to need to add pagination to earthstar-graphql. Right now every message is returned from the beginning, which is nice because your scrollbar actually indicates how far you can scroll down before reaching the first document. Maybe not so nice with lots and lots of documents.
- I want to make a little animation showing how many documents were received and sent. This is my dream.
- Because authors can have colliding short and long names, it would be great to create some kind of UI that transforms the full address into a easily recognisable fingerprint or phrase of some kind.
