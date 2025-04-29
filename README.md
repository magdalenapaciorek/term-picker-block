# Term Picker Block

This is a custom WordPress block built with React using native Gutenberg components.  
It lets the user pick a taxonomy (like categories or tags), and then select a term from that taxonomy.

The block is synchronized with the WordPress core data store — so if the selected term is changed elsewhere (like in the post sidebar), the block updates automatically. This is done using `useSelect`, which not only fetches data from the store but also subscribes the component to any changes in that data.

🛠 Built with:

-   React
-   WordPress block editor APIs
-   `@wordpress/data` and `@wordpress/components`

A recording of a demo showing how the block works in the editor.

---
