export interface RequestBodyDto {
  headers?: {
    authorization?: string;
  };
  params?: { id?: string };
  body?: {
    coverImageUrl?: string;
    description?: string;
    year?: number;
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
    favoriteGames?: string[];
  };
}
