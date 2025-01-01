import { useQuery,useQueryClient } from '@tanstack/react-query';
import useMatchStore from './store/matchStore'; // Assuming your Zustand store is here
import MatchDataService from './services/match.service';
import MatchPair from './MatchPair'; // Importing MatchPair component

const MatchList = () => { 
  const queryClient = useQueryClient();
  console.log(useMatchStore.getState()); // Logs the entire current state

  // Check cache before making a query
  const cachedData = queryClient.getQueryData(['matches']);
  console.log('Cached Matches:', cachedData);
  const { data, error, isLoading } = useQuery({
    queryKey: ['matches'],
    queryFn: MatchDataService.getAll,
    refetchOnWindowFocus: false
  });

  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const matches = data.data;
  return (
    <div>
      <h4>Matches List</h4>
      <ul>
        {matches.map((match, index) => (
          <MatchPair key={index}  match={match}>
          <div className="mb-4">
            <div>
              <strong>Mentor: </strong>{match.mentor.firstName} {match.mentor.lastName}
            </div>
            <div>
              <strong>Student: </strong>{match.student.firstName} {match.student.lastName}
            </div>
          </div>

          </MatchPair>
        ))}
      </ul>
    </div>
  );
}

export default MatchList;
