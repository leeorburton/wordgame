// Example usage in pages/[slug].tsx
export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: 'example-slug' } }
        ],
        fallback: false // or 'blocking' or true
    };
}

export async function getStaticProps({ params }) {
    // Fetch data based on params.slug
    return {
        props: {
            // data
        }
    };
}

function DynamicPage({ data }) {
    return <div>{/* render content */}</div>;
}

export default DynamicPage;
