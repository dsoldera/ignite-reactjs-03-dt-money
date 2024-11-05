import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

const searchFormSchema = z.object({
  query: z.string(),
});

type searchFormInputs = z.infer<typeof searchFormSchema>

export const SearchForm = () => {
  const { fetchTransactions } = useContext(TransactionsContext);
  
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<searchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  });

  const handleSearchForm = async (data: searchFormInputs) => {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchForm)}>
      <input type="text" placeholder="Busque por transações"  {...register("query")} />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}