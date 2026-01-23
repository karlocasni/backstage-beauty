// Mock data for the website - Croatian version
export const mockPosts = [
    {
        id: 1,
        title: "Budućnost Čiste Ljepote",
        shortDesc: "Je li zaista bolja za vašu kožu? Uranjamo duboko u sastojke.",
        content: `<p>Istražujemo revoluciju čiste ljepote i što ona zapravo znači za vašu kožu.</p>
<h3>Istina o Parabenima</h3>
<p>Razbijamo mitove i otkrivamo znanstvene činjenice o najpopularnijim sastojcima u kozmetici.</p>`,
        instagramUrl: "https://instagram.com",
        youtubeUrl: "https://youtube.com",
        featuredImage: "",
        galleryImages: null,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
    },
    {
        id: 2,
        title: "Tajne Iza Kulisa Fashion Weeka",
        shortDesc: "Što se događa dok modeli čekaju? Kaos i lak za kosu.",
        content: `<p>Ekskluzivan pogled na ono što se zapravo događa iza kulisa najvećih modnih revija.</p>`,
        instagramUrl: "https://instagram.com",
        youtubeUrl: "https://youtube.com",
        featuredImage: "",
        galleryImages: null,
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-10"),
    },
    {
        id: 3,
        title: "Razbijanje Mitova o Njezi Kože",
        shortDesc: "Dr. Smith nam se pridružuje kako bi razbio uobičajene mitove.",
        content: `<p>Odvajanje činjenica od fikcije u svijetu njege kože.</p>`,
        instagramUrl: "https://instagram.com",
        youtubeUrl: "https://youtube.com",
        featuredImage: "",
        galleryImages: null,
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-05"),
    },
];

export async function getPosts() {
    return mockPosts;
}

export async function getPost(id: number) {
    return mockPosts.find(post => post.id === id) || null;
}

export async function createPost(formData: FormData) {
    // Mock implementation
    console.log("Post created:", formData);
}

export async function deletePost(id: number) {
    // Mock implementation
    console.log("Post deleted:", id);
}

export async function updatePost(id: number, formData: FormData) {
    // Mock implementation
    console.log("Post updated:", id, formData);
}
