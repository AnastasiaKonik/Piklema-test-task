interface Pet {
    id: number;
    name: string;
    category: {
        id: number;
        name: string;
    };
    photoUrls: string[];
    tags: {
        id: number;
        name: string;
    }[];
    status: string;
}

async function getPet(petId: number): Promise<Pet> {
    try {
        const response = await fetch(`https://petstore3.swagger.io/api/v3/pet/${petId}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Пример использования
const petId = 10;

getPet(petId)
    .then((pet) => {
        console.log(pet);
    })
    .catch((error) => {
        console.error(error);
    });