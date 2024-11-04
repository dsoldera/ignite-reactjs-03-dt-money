import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const searchFormSchema = z.object({
  search: z.string(),
});

type searchFormInputs = z.infer<typeof searchFormSchema>

export const SearchForm = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<searchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  });

  const handleSearchForm =  (data: searchFormInputs) => {
    console.log('data', data);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchForm)}>
      <input type="text" placeholder="Busque por transações"  {...register("search")} />

      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}