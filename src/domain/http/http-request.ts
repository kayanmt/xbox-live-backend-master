export interface HttpRequest {
  authorization?: string;
  id?: string;
  body?: {
    favoriteGames?: string[];
    userId?: string;
    coverImageUrl?: string;
    description?: string;
    year?: number;
    gender?:string;
    imdbScore?: number;
    trailerYouTubeUrl?: string;
    gameplayYouTubeUrl?: string;
    title?: string;
    imageUrl?: string;
    name?: string;
    email?: string;
    password?: string;
    cpf?: string;
    isAdmin?: boolean;
  };
}
