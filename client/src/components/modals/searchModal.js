import Modal from "./modal";
import useSearchModal from "../../hooks/useSearchModel";
import Search from "../Search";

function SearchModal() {
   
    const searchModal = useSearchModal();

   
    const bodyContent = (
        <div>
            <Search/>
        </div>
    )

   
    return (
        <div>
            <Modal
                isOpen={searchModal.isOpen}
                title="Search"
                onClose={searchModal.onClose}
                body={bodyContent}
                />
        </div>
    )
}

export default SearchModal;

