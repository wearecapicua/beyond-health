type FormHeaderProps = {
  title?: string;
  subtitle?: string;
};

export default function FormHeader({
  title,
  subtitle
}: FormHeaderProps) {
  
  return (
    <div className="px-6 pt-8 pb-7">
      <div className="mx-auto max-w-[750px] text-center">
        {title && 
          <h2 className="leading-tight text-2xl md:text-4xl">
            {title}
          </h2>
        }
        {subtitle && 
          <p className="mx-auto mt-6 text-lg leading-8">
            {subtitle}
          </p>
        }
      </div>
    </div>
  );
}