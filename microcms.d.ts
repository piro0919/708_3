declare namespace MicroCMS {
  type Image = {
    height: number;
    url: string;
    width: number;
  };

  type WorkImage = {
    fieldId: "image";
    image: Image;
  };

  type Works = {
    title: string;
    description: string;
    images: WorkImage[];
    url?: string;
  };

  type About = {
    profile: string;
  };

  type Illustrations = {
    image: Image;
    tweetDate: string;
  };
}
