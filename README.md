# Term Picker Block

This is a custom WordPress block built with React using native Gutenberg components.  
It lets the user pick a taxonomy (like categories or tags), and then select a term from that taxonomy.

The block is synchronized with the WordPress core data store — so if the selected term is changed elsewhere (like in the post sidebar), the block updates automatically. This is done using `useSelect`, which not only fetches data from the store but also subscribes the component to any changes in that data.

🛠 Built with:

-   React
-   WordPress block editor APIs
-   `@wordpress/data` and `@wordpress/components`

---

🧑‍💻 If you’d like to see a live demo in WP Playground <a href="https://playground.wordpress.net/?import-site=https%3A%2F%2Fraw.githubusercontent.com%2Fmagdalenapaciorek%2Fterm-picker-block%2Fmain%2Fplayground%2Fplayground-export-term-picker-block.zip&url=%2Fwp-admin%2Fpost.php%3Fpost%3D9%26action%3Dedit" target="_blank">click here</a> (open in Chrome).

▶️ A recording of a demo showing how the block works in the editor:

https://github.com/user-attachments/assets/9e9b3101-d895-4116-a4fc-04282988ab00
