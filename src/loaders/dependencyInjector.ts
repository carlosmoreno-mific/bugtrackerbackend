import Container from "typedi";

export default ({ models }: { models: { name: string; repo: any }[] }) => {
  try {
    models.forEach(model => {
      Container.set(model.name, model.repo);
    });
  } catch (error) {
    throw error;
  }
};
