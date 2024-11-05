import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { memo } from "react";

const searchFormSchema = z.object({
  query: z.string(),
});

type searchFormInputs = z.infer<typeof searchFormSchema>

//const SearchFormComponent = () => {
export const SearchForm = () => {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    }
  );
  
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

//export const SearchForm = memo(SearchFormComponent);